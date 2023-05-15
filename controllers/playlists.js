const playlist = require('../models/playlist');
const Playlist = require('../models/playlist');

// READ ACTION - Index
// GET all of the currently signed in users playlists
function index(req, res, next) {
  Playlist.find({ user: req.user._id })
    .then((playlists) => {
      res.render('playlists/index', {
        playlists,
        title: 'My Playlists',
      });
    })
    // if something goes wrong, pass it along to the error handler
    .catch(next);
}

//renders a form for new playlist from a user
function newPlaylist(req, res) {
    res.render('playlists/new', { title: 'New Playlist' })
}

// creates a playlist - CRUD 
function create(req, res, next) {
    // from the session `req.user._id` I would like the `req.body` to have the current signed in user 
    // {name: 'some value', user: 'object id value'}
    req.body.user = req.user._id
    Playlist.create(req.body)
        .then(() => res.redirect('/playlists'))
        .catch(next)
}

// read action CRUD - show
function show(req, res, next) {
    Playlist.findById(req.params.id)
        // () => {}
        .then(playlist => {
            res.render('playlists/show', {
                playlist, 
                title: 'Playlist Details'
            })
        })
        .catch(next)
}


module.exports = {
    index, 
    newPlaylist,
    create,
    show,
}