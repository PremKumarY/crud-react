import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/userRoutes.js';
import cors from 'cors';


const app = express();
app.use(cors());

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL ;

mongoose.connect(MONGO_URL).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });   

})
.catch((error) => 
  console.error('MongoDB connection error:', error));   


app.use('/api/users', route);