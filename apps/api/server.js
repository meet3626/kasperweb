const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const mfaRoutes = require('./routes/mfaRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Set security HTTP headers
app.use(helmet());

// Rate Limiting (100 requests per 10 minutes per IP)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again in 10 minutes.'
});
app.use('/api/', limiter);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sanitize data against NoSQL injection
// app.use(mongoSanitize());

// Prevent XSS attacks
// app.use(xss());

// CORS configuration (allow requests from frontend)
app.use(cors({
  origin: true,
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mfa', mfaRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
