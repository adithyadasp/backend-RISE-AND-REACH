const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to JSON file
const filePath = path.join(__dirname, '../data/helplines.json');

// GET all helplines
router.get('/', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.json(data);
    } catch (error) {
        console.error('Error reading helplines:', error);
        res.status(500).json({ error: 'Failed to fetch helplines' });
    }
});

// POST a new helpline
router.post('/add', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const newHelpline = { id: data.length + 1, ...req.body };
        data.push(newHelpline);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        res.json({ message: 'Helpline added successfully!', helpline: newHelpline });
    } catch (error) {
        console.error('Error adding helpline:', error);
        res.status(500).json({ error: 'Failed to add helpline' });
    }
});

module.exports = router;
