
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helplineRoutes = require('./routes/helpline');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Women Helpline API Server Running' });
});

// Connect API routes
app.use('/api/helplines', helplineRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});