const mongoose = require('mongoose');

var SinUp = mongoose.model('SinUp2', {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    pwd: {
        type: Number,
        required: true,
        min: 4
    }
});

module.exports = {SinUp};