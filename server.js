const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
require('dotenv').config();


const app = express();
app.use(express.json());

// Use user routes TO api endpoints
app.use('/api', userRoutes);

// listen on this port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});