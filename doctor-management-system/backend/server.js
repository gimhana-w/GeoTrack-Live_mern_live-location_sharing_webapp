const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketSetup = require('./socket');
const connectDB = require('./config/db.js');

const app = express();
const server = http.createServer(app);

//db connection
connectDB();
  
  app.use(express.json());

socketSetup(server); 

//midelware
app.use('/api/doctors', require('./routes/doctorRoutes'));



// start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});