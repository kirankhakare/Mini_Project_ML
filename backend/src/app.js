const express = require('express');

const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const predictionRoutes = require('./routes/predictionRoutes');

const historyRoutes = require('./routes/historyRoutes');

const app = express();

app.use(cors());

app.use(express.json());


// Routes

app.use('/api/auth', authRoutes);

app.use('/api/predict', predictionRoutes);

app.use('/api/history', historyRoutes);


module.exports = app;