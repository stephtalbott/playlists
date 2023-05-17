const express = require('express')
const router = express.Router()

const songCtrl = require('../controllers/songs')
const song = require('../models/song')

//root directory is '/' 

router.post('/playlists/:playlistId', songCtrl.addSongToPlaylist)
router.delete('/playlists/:playlistId/:songId', songCtrl.deleteSongFromPlaylist) 


module.exports = router