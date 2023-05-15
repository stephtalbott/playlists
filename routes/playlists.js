const express = require("express");
const router = express.Router();

const playlistCtrl = require("../controllers/playlists")

router.get('/', playlistCtrl.index) 

// localhost:3000/playlists/new
router.get('/new', playlistCtrl.newPlaylist)

// localhost:3000/playlists/
router.post('/', playlistCtrl.create)

// localhost:3000/playlists/<specific playlist Id>
router.get("/:id", playlistCtrl.show);

module.exports = router