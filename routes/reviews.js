const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to JSON file
const filePath = path.join(__dirname, '../data/reviews.json');

// GET all reviews for a specific helpline
router.get('/:helplineId', (req, res) => {
    try {
        const helplineId = parseInt(req.params.helplineId);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const reviews = data.filter(review => review.helplineId === helplineId);
        res.json(reviews);
    } catch (error) {
        console.error('Error reading reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// GET all reviews
router.get('/', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.json(data);
    } catch (error) {
        console.error('Error reading reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// POST a new review
router.post('/add', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const newReview = {
            id: data.length > 0 ? Math.max(...data.map(r => r.id)) + 1 : 1,
            helplineId: req.body.helplineId,
            userName: req.body.userName || 'Anonymous',
            rating: req.body.rating,
            comment: req.body.comment,
            date: new Date().toISOString().split('T')[0]
        };

        // Validate input
        if (!newReview.helplineId || !newReview.rating || !newReview.comment) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (newReview.rating < 1 || newReview.rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        data.push(newReview);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        res.json({ message: 'Review added successfully!', review: newReview });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

module.exports = router;
