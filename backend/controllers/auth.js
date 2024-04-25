const User = require('../models/User.model');
const { hashPassword, verifyPassword }  = require('../utils/passwordUtils');

const generateToken = require('../utils/generateToken');


const signUp = async (req, res) => {
    try {
        const { email, password, ...otherFields } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('User with email already exists');
            return res.status(400).json({ error: 'User with email already exists' });
        }
        // TODO: Add validation for email and password if needed

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            ...otherFields
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
        return res.status(500).json({ error: 'Internal server error' });   
    }
};

const signIn = async(req, res) => {
    try{
        const { username, password } = req.body;
        
        if( !username || !password ) {
            console.error('Username or password not provided.')
            return res.status(401).json({ error: 'Invalid username or password.'})
        }

        const user =  await User.findOne({ username });
        if(!user){
            console.error('User with given username not found.')
            return res.status(404).json({ error: 'Invalid username or password.'})
        }
        // Verify user password against the hashed password
        const isPasswordMatch = verifyPassword(password, user.password);
        if (!isPasswordMatch){
            console.error('Incorrect password.')
            return res.status(401).json({ error: 'Invalid username or password.'})
        }

        // Generate token
        const token = await generateToken(user.id);

        const { __v, password: userPassword, ...userWithoutPassword} = user.toObject();
        userWithoutPassword.token = token;

        return res.json(userWithoutPassword);
    } catch(error){
        console.error("Error signing in user: ", error);
        return res.status(500).json({ error: 'Internal server error'})
    }
};

const signOut = async (req, res) => {
    try {
        const { token } =  req.headers;

        // Todo: Invalidate the token 
        // Discuss how we going to do this.
        // Could be just deleting the token in the client-side and nothing major
        return res.json({ message: 'You have successfully signed out.'});

    } catch(error) {
        console.error('Error signing out user: ', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    signUp,
    signIn,
    signOut
};