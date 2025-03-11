import express from 'express';
import dotenv from 'dotenv';
import { connect } from './config/database.mjs';
import expenseRoutes from './routes/expenseRoutes.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to the database
connect();

// Routes
app.use('/', expenseRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});