const express = require('express');
const router = express.Router();

const playlistCtrl = require('../controllers/playlists')

// localhost:3000/playlists/
router.get('/', playlistCtrl.index) 

// localhost:3000/playlists/new
router.get('/new', playlistCtrl.newPlaylist)

// localhost:3000/playlists/
router.post('/', playlistCtrl.create)

// localhost:3000/playlists/<specific playlist Id>
router.get('/:id', playlistCtrl.show);

// localhost:3000/playlists/<specific id>/edit
router.get('/:id/edit', playlistCtrl.updatePlaylistForm)

// localhost:3000/playlists/<specific id>
router.put('/:id', playlistCtrl.update)

// localhost:3000/playlist/<specific id>
router.delete('/:id', playlistCtrl.deletePlaylist) 

module.exports = router