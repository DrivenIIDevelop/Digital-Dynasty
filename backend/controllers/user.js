const User = require('../models/User.model');

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        if(!userId){
            console.error('UserId is invalid.');
            return res.status(404).json({ error: 'User not found.'});
        }
        
        const user = await User.findOne({ _id : userId });
        if(!user){
            console.error('User with provided userId not found.');
            return res.status(404).json({ error: 'User not found.'});
        }
    
        // Remove __v and password from the user data we are returning in the res
        const {__v, password: userPassword, ...userWithPassword } = user.toObject();
        
        return res.json(userWithPassword);
    } catch (error) {
        console.error('Error while retrieving a user: ', error);
        return res.status(500).json({error: 'Internal server error'});
    }
};

const updateUser = async (req, res) => {
    try {
        const userId =  req.params.userId;

        if(!userId){
            console.error('UserId is invalid.');
            return res.status(404).json({ error: 'User not found.'});
        }

        const user = await User.findOne({ _id : userId });
        if(!user){
            console.error('User with provided userId not found.');
            return res.status(404).json({ error: 'User not found.'});
        }

        const updateData = req.body;
        await User.updateOne({ _id : userId }, updateData);
        
        const updatedUser = await User.findOne({ _id: userId});

         // Remove __v and password from the user data we are returning in the res
         const { __v: v, password: userPassword, ...userWithoutPassword } = updatedUser.toObject();

        return res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error while updating a user: ', error);
        return res.status(500).json({ error: 'Internal server error'});
    }
}

module.exports = {
    getUser,
    updateUser
};