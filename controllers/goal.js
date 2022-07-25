const Goal = require('../models/Goal');
const asyncHandler = require('express-async-handler');
//@desc Get goals
//@route GET /api/goals
//@access Private
exports.getAll = asyncHandler(async (req, res, next) => {
        const goals = await Goal.find();
        res.status(200).send(goals);
});

//@desc Create New goal
//@route POST /api/goals
//@access Private
exports.createGoal = asyncHandler(async (req, res, next) => {
    const { text } = req.body;
    let goal = await Goal.findOne({ text });

    if (goal) {
        res.status(400);
        throw new Error('the goal exist');
    }
    if (!text) {
        res.status(400);
        throw new Error('Empty field');
    }
    goal = new Goal({ ...req.body });
    await goal.save();
    res.status(200).send({ msg: 'New Goal Created!' });
});

//@desc Update goal
//@route PUT /api/goals/:_id
//@access Private
exports.updateGoal = asyncHandler(async (req, res, next) => {
    const { _id } = req.params;
    const goal = await Goal.findById(_id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found')
    }
    await Goal.updateOne({
        _id, $set: {
            ...req.body
        }
    });

    res.status(200).send({msg:'Goal Updated!'})
});

//@desc Delete goal
//@route DELETE /api/goals/:_id
//@access Private
exports.deleteGoal = asyncHandler(async (req, res, next) => {
    const { _id } = req.params;
    const goal = await Goal.findById(_id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found')
    }
    await Goal.deleteOne({ _id });
    res.status(200).send({ msg: 'Goal Deleted' });
});
