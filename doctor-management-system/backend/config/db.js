const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://dblocation:lKgiLd1kN068f4zR@location.a4ia5.mongodb.net/?retryWrites=true&w=majority&appName=location');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;
