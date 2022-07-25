const router = require('express').Router();
const goalCtrl = require('../controllers/goal');

router.route('/').get(goalCtrl.getAll).post(goalCtrl.createGoal);
router.route('/:_id').put(goalCtrl.updateGoal).delete(goalCtrl.deleteGoal);

module.exports = router;