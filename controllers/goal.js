const Goal = require('../models/Goal');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

//@desc Get goals
//@route GET /api/goals
//@access Private
exports.getAll = asyncHandler(async (req, res, next) => {
   
        const goals = await Goal.find({userId: req.user._id});
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
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }
    if (!text) {
        res.status(400);
        throw new Error('Empty field');
    }

    await Goal.create({ text, userId: req.user._id });
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
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    if (goal.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authoorizd')
    }
    await Goal.updateOne(
        { _id }, {
        $set: {
            text: req.body.text
        }
    }
    );

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
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    if (goal.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authoorizd')
    }
    
    await Goal.deleteOne({ _id });
    res.status(200).send({ msg: 'Goal Deleted' });
});
