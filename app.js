const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helplineRoutes = require('./routes/helpline');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect API
app.use('/api/helplines', helplineRoutes);

// Start server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
