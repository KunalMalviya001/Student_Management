import db from '../config/db.js'; // Import the database connection
import { calculateDistance } from '../utils/distance.js'; // Import helper function to calculate distance between coordinates

// Controller to add a new school to the database
const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate that all required fields are provided
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Insert the new school into the 'schools' table
    await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    // Send success response
    res.status(201).json({ message: 'School added successfully' });
  } catch (error) {
    // Handle any errors during insertion
    res.status(500).json({ error: error.message });
  }
};

// Controller to list schools sorted by proximity to given coordinates
const listSchools = async (req, res) => {
  // Parse latitude and longitude from query parameters
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  // Validate coordinates
  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: 'Invalid coordinates provided.' });
  }

  try {
    // Fetch all schools from the database
    const [schools] = await db.execute('SELECT * FROM schools');

    // Calculate distance from user to each school and sort by distance ascending
    const sorted = schools
      .map(school => ({
        ...school,
        distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

    // Send sorted list of schools back to client
    res.status(200).json(sorted);
  } catch (error) {
    // Handle any errors during fetching or processing
    res.status(500).json({ error: error.message });
  }
};

// Export controllers for use in routes
export { addSchool, listSchools };
export default { addSchool, listSchools };
