// src/index.ts
import express from 'express';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes';
import statRoutes from './routes/statRoutes';

import { webhookHandler } from './controllers/webhookController';


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/stats', statRoutes )
app.post('/webhook', webhookHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});