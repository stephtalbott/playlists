const Playlist = require('../models/playlist');
const User = require('../models/user')

// READ ACTION - Index
// GET all of all users playlists
function index(req, res, next) {
  Playlist.find({})
    .populate('user')
    .then((playlists) => {
      res.render('playlists/index', {
        playlists,
        title: 'All Playlists',
      });
    })
    // if something goes wrong, pass it along to the error handler
    .catch(next);
}

// READ ACTION
// GET all of the currently signed in user's playlists
function myIndex(req, res, next) {
  Playlist.find({ user: req.user._id })
  .then(playlists => {
    res.render('playlists/mine', {
      playlists, 
      title: 'My Playlists'
    });
  })
  .catch(next)
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
    .then(() => res.redirect('/playlists/mine'))
    .catch(next)
}

// read action CRUD - show
function show(req, res, next) {
  const user = req.user;
  Playlist.findById(req.params.id)
    .populate('user')
    .then(playlist => {
      res.render('playlists/show', {
        playlist, 
        user, 
        title: 'Playlist Details'
      })
    })
    .catch(next)
}

function updatePlaylistForm(req, res, next) {
  Playlist.findById(req.params.id)
  .then((playlist) => {
      res.render("playlists/edit", {
      playlist,
      title: "Playlist Edit Detail",
      });
  });
}

function update(req, res, next) {
  Playlist.findById(req.params.id)
    .then((playlist) => {
      if (!playlist.user.equals(req.user._id))
        throw new Error("Unauthorized");
      // if the users match, update with updateOne method and pass in the info from the form
      return playlist.updateOne(req.body);
    })
    .then(() => res.redirect(`/playlists/${req.params.id}`))
    .catch(next);
}

function deletePlaylist(req, res, next) {
  Playlist.findById(req.params.id)
    .then((playlist) => {
      if (!playlist.user.equals(req.user._id))
        throw new Error("Unauthorized");
      return playlist.deleteOne();
    })
    .then(() => res.redirect("/playlists/mine"))
    .catch(next);
}

module.exports = {
  index, 
  newPlaylist,
  myIndex,
  create,
  show,
  updatePlaylistForm,
  update,
  deletePlaylist,
}