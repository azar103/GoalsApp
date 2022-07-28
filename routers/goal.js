const router = require('express').Router();
const goalCtrl = require('../controllers/goal');
const passport = require('passport');
require("../config/passport")(passport);
router.route('/').get(passport.authenticate('jwt', { session: false }), goalCtrl.getAll)
    .post(passport.authenticate('jwt', { session: false }),goalCtrl.createGoal);
router.route('/:_id').put(passport.authenticate('jwt', { session: false }), goalCtrl.updateGoal).
    delete(passport.authenticate('jwt', { session: false }), goalCtrl.deleteGoal);

module.exports = router;