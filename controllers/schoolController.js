import db from '../config/db.js';
import {calculateDistance} from '../utils/distance.js';


const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: 'Invalid coordinates provided.' });
  }

  try {
    const [schools] = await db.execute('SELECT * FROM schools');
    const sorted = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { addSchool, listSchools };
export default { addSchool, listSchools };