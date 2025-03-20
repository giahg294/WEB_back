// src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const MONGODB_URI = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.qyjvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    console.log(MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;