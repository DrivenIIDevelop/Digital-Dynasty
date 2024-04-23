const router = require('express').Router();
const { signUp, signIn, signOut } = require('../controllers/auth');

router.post('/signup', signUp);
router.post('/login', signIn);
router.post('/logout', signOut);

module.exports = router;