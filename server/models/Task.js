const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        default: Date.now()
    },
    creatorUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Task', TaskSchema);
