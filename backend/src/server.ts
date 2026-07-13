import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'G-Scores API is running' });
});

const startServer = async () => {
  await connectDB();
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
