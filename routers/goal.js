const router = require('express').Router();
const goalCtrl = require('../controllers/goal');
router.get('/all', goalCtrl.getAll);
router.post('/new', goalCtrl.createGoal);
router.put('/:_id', goalCtrl.updateGoal);
router.delete('/:_id', goalCtrl.deleteGoal);

module.exports = router;