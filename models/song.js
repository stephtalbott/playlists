const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        artistName: {
            type: String, 
            required: true,
        },
    }, {
        timestamps: true,
    }
);

module.exports = ('Song', songSchema);
