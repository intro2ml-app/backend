import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import connectDB from './db/connection.js';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import initModels from './db/model_init.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB and initialize models database
connectDB();
initModels();

// Initialize passport, session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Use the routes defined in the routes folder
app.use(routes);

// Start the Express server and store the HTTP server instance
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Handle SIGTERM for graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
