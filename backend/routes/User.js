const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/user');


router.get('/profile/:userId', getUser);
router.post('/profile/:userId', updateUser);

module.exports = router;
