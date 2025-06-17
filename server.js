import express from 'express';
import bodyParser from 'body-parser';
import schoolRoutes from './routes/schoolRoutes.js';

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(bodyParser.json());

// Mount the school routes at the root path
app.use('/', schoolRoutes);

// Use environment variable PORT or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
