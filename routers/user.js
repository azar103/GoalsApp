const router = require('express').Router();
const userCtrl = require('../controllers/user');
const passport = require('passport');

require("../config/passport")(passport);
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
router.get('/current', passport.authenticate('jwt', {session:false}), userCtrl.getCurrentUser);

module.exports = router;