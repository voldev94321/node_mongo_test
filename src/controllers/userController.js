const User = require('../models/userModel');
const mongoose = require('mongoose');

// GET /users/:id - Retrieve user by ID with age > 21
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const user = await User.findOne({ _id: id, age: { $gt: 21 } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });  // 👈 404 if no user found
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
