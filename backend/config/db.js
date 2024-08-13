// src/config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Replace the following with your MongoDB URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
