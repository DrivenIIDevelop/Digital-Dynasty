const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = async (userId) => {
    try {
        return jwt.sign({userId},  process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY_TIME
        });
    } catch(error) {
        console.error('Error generating token:', error.message);
        throw error;
    }
};

const verifyToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId
    } catch (error) {
       console.error('Error while validating user: ', error);
       throw error; 
    }
}

module.exports = {
    generateToken,
    verifyToken
};