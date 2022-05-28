import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'
import { request } from 'http';
import errorMiddleware from './middleware/errorMiddleware'

const port = 3000;

// create instant server
const app = express();

// HTTP request logger middleware
app.use(morgan('common'));

// HTTP security middleware headers
app.use(helmet());

// middleware to parse incoming request 
app.use(express.json());

// Basic rate-limiting middleware for Express
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 2 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many rquests from this IP, please try again after an hour',
  })
);




// add routing for / path
app.get('/', (req, res) => {
  //throw new Error('Error exist');
  res.json({
    message: 'Hello World 🌍',
  })
});

// post request
app.post('/', (req, res) => {
  res.json({
    message: 'Hello World 🌍 from post',
    data: req.body,
  })
});

// error handler middleware
app.use(errorMiddleware)

app.use(function (_req, res) {
    res.status(404).json({
      message: 'Ohh you are lost, read the API documentation to find your way back home 😂',
    });
  })

// start express server
app.listen(port, ()=> {
    console.log(`server started at localhost:${port}`)
    });
    

export default app
