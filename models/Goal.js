const mongoose = require('mongoose');

const { Schema } = mongoose;

const GoalSchema = new Schema({
    text: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('goal', GoalSchema);