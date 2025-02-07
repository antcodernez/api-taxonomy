import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Import DB connection and routes
import connectDB from './db/database.js'; 
import apiRoutes from './routes/records.js';

// Get the current directory name (for ES module compatibility)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Set the port from environment variable or default to 3001
app.set('port', process.env.PORT || 3001);

// Set the views directory and EJS as the view engine
app.set('views', path.join(__dirname, 'views'));  // The 'views' folder will hold your EJS templates
app.set('view engine', 'ejs');

// Connect to the database
connectDB();

// Use morgan for logging requests
app.use(morgan('dev'));

// Parse incoming JSON requests and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory (optional for frontend assets)
app.use(express.static(path.join(__dirname, 'public')));

// Set the main route (could be a placeholder or homepage)
app.get("/", (req, res) => {
    res.render('index');  // This will render the 'index.ejs' file
});

// Use the API routes for taxonomic records
app.use('/api', apiRoutes);

// Export the app for use in other files (like in your server setup)
export default app;
