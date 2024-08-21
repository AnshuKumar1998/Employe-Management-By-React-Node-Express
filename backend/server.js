const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json()); 

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// Use Routes
app.use('/api', authRoutes);

// Connect to database and start the server
connectDB().then(() => {
    app.listen(8081, () => {
        console.log("Server is running on port 8081");
    });
});
