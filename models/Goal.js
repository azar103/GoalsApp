const mongoose = require('mongoose');

const { Schema } = mongoose;

const GoalSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        require:true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('goal', GoalSchema);