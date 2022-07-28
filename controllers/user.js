const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//@desc register
//@route POST /api/users/register
//@access Private

exports.register = asyncHandler(async (req, res, next) => { 
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Empty field(s)')
    }
    let user = await User.findOne({ email });
   
    if (user) {
        res.status(201);
        throw new Error('The user already exist!')
    }
   
    user = new User({ username, email, password });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    const token = generateToken(user.id);
    await user.save();
    res.status(200).send({ user, token: `Bearer ${token}`,msg:'a new user is created'});
});

//@desc login
//@route POST /api/users/login
//@access Private

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(201);
        throw new Error('Empty field(s)')
    }
    let user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error('invalid credentials')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error('invalid credentials')
    }

    const token = generateToken(user.id);
    res.status(200).send({ user, token:`Bearer ${token}`,msg:'login success'});
 });
exports.getCurrentUser = asyncHandler(async (req, res, next) => { 
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).send(user);
});

//@desc get Current User
//@route GET /api/users/current
//@access Private

const generateToken = (_id) => {
    return jwt.sign({
        _id
    }, process.env.SECRET_KEY, {
        expiresIn:'30d'
    })
}