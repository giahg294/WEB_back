// src/index.ts
import express from 'express';
import userRoutes from './routes/userRoutes';


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});