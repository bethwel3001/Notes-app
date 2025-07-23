require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

//CORS Configuration: allow only Netlify origin
app.use(cors({
  origin: ['https://magenta-scone-b7c525.netlify.app'], 
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);

// Health check
app.get('/health', (req, res) => res.send('OK'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error(err));
