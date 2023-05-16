const mongoose = require('mongoose');
const songSchema = require('./song');

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        song: [songSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Playlist', playlistSchema);
