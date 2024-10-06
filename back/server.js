const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use (cors());

//connect to db
mongoose.connect(process.env.MONGO_URI,
     { useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

//locayion model
const Location = require('./models/Location');


// Save a fixed location
app.post('/location', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const newLocation = new Location({ lat, lng });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get fixed location
app.get('/location', async (req, res) => {
  try {
    const location = await Location.findOne(); // Return the first fixed location
    res.status(200).json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
        
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));