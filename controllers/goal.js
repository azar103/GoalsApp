const Goal = require('../models/Goal');
const asyncHandler = require('express-async-handler');

exports.getAll = asyncHandler(async (req, res, next) => {
        const goals = await Goal.find();
        res.status(200).send(goals);
});
exports.createGoal = asyncHandler(async (req, res, next) => {
    const { text } = req.body;
    let goal = await Goal.findOne({ text });
    if (goal) {
        res.status(400);
        throw new Error('the goal exist');
    }
    goal = new Goal({ ...req.body });
    await goal.save();
    res.status(200).send({ msg: 'New Goal Created!' });
});
exports.updateGoal = asyncHandler(async (req, res, next) => {
    const { _id } = req.params;
    await Goal.updateOne({
        _id, $set: {
            ...req.body
        }
    });

    res.status(200).send({msg:'Goal Updated!'})
});

exports.deleteGoal = asyncHandler(async (req, res, next) => {
    const { _id } = req.params;
    await Goal.deleteOne({ _id });
    res.status(200).send({ msg: 'Goal Deleted' });
});
