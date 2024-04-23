const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = async (userId) => {
    try {
        return jwt.sign({userId},  process.env.JWT_SECRET, {
            expiresIn: '60s'
        });
    } catch(error) {
        console.error('Error generating token:', error.message);
        throw error;
    }
};

module.exports = generateToken;