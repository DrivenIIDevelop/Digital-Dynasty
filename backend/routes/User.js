const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/user');
const authenticateUser = require('../middlewares/authenticateUser');


router.get('/profile/:userId', authenticateUser, getUser);
router.put('/profile/:userId', authenticateUser, updateUser);

module.exports = router;
