import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from '../src/routes/userRoutes';

const app = express();
const PORT = 3000;

const mongoOptions: Record<string, any> = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  
  

mongoose.connect('mongodb://localhost:27017/Riad-database', mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(bodyParser.json());

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(` server success ${PORT}`);
});
