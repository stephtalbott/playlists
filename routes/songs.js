const express = require('express')
const router = express.Router()

const songCtrl = require('../controllers/songs')


router.post(':playlistId', songCtrl.addSongToPlaylist)

module.exports = router