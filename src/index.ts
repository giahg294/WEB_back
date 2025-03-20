// src/index.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';
import dotenv from 'dotenv';
import { webhookHandler } from './controllers/webhookController';


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

connectDB();

// Routes
app.use('/api/users', userRoutes);
app.post('/webhook', webhookHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});