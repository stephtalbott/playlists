const playlist = require('../models/playlist')
const Playlist = require('../models/playlist')


function addSongToPlaylist(req, res, next) {
    Playlist.findById(req.params.playlistId)
        .then(playlist => {
            playlist.song.push(req.body)
            return playlist.save()
        })
        .then(() => {
            res.redirect(`/playlists/${req.params.playlistId}`)
        })
        .catch(next)    
}

function deleteSongFromPlaylist(req, res, next) {
    Playlist.findById(req.params.playlistId)
        .then((playlist) => {
        if (!playlist.user.equals(req.user._id))
        throw new Error("Unauthorized");
        playlist.song.id(req.params.songId).deleteOne();
        return playlist.save();
    })
    .then(() => res.redirect(`/playlists/${req.params.playlistId}`))
    .catch(next);
}

module.exports = {
    addSongToPlaylist,
    deleteSongFromPlaylist,
}
