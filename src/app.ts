import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import recruiterRoutes from './routes/recruiterRoutes';
import { setupSocket } from './helpers/socket';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    'http://localhost:4200',
    'https://connect-client-q6urojz23-nehyan9895s-projects.vercel.app', // Add production frontend URL
  ];
  
  const corsOptions:cors.CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200,
  };
  
  // Use CORS middleware
  
  
  
  app.use(cors(corsOptions));

app.use('/admin', adminRoutes);
app.use('/candidate', userRoutes);
app.use('/recruiter', recruiterRoutes);

connectDB();

const PORT = 5001;

const server = http.createServer(app);
setupSocket(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});
// 'http://localhost:4200', 