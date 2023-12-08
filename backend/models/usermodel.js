const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    topic: {
        type: [String], 
    },
    id: {
        type: Number, 
    },
});

const userModel = model('user', userSchema);

module.exports = userModel;