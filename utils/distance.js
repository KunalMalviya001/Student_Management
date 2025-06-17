// Calculate the great-circle distance between two points
// using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  // Convert degrees to radians
  const toRad = x => (x * Math.PI) / 180;

  const R = 6371; // Earth's radius in kilometers

  // Differences in coordinates, converted to radians
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  // Apply Haversine formula components
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  // Calculate the distance in kilometers
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export { calculateDistance };
export default calculateDistance;
