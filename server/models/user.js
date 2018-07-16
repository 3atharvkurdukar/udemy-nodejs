const mongoose = require('mongoose');

// mongoose generates a DB model for validating the input
const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String
    }
});
module.exports = {
    User
};
