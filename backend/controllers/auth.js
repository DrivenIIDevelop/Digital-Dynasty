const User = require('../models/User.model');
const hashPassword = require('../utils/hashPassword');

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('User already exists');
            return res.status(400).json({ error: 'User already exists' });
        }
        // TODO: Add validation for email and password if needed

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            ...req.body
        });

        const savedUser = await newUser.save();

        // Return the user without the password
        const { __v, password: userPassword, ...userWithoutPassword } = savedUser.toObject();

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error('Validation error:', error);
            return res.status(422).json({ error: error.message });
        }
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });   
    }
};

module.exports = signUp;