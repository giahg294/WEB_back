// src/index.ts
import express from 'express';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes';
import statRoutes from './routes/statRoutes';
import mailRoutes from './routes/mailRoutes';

import { webhookHandler } from './controllers/webhookController';


const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",  
  credentials: true
}));

connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/stats', statRoutes )
app.post('/webhook', webhookHandler)
app.use('/email', mailRoutes)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});