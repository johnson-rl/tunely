
var db = require('../models');
// controllers/albumsController.js
// GET /api/albums
function index(req, res) {
  // send back all albums as JSON
  console.log(db.Albums);

  db.Album.find({}, function(err, allAlbums){
    if (err){
      console.log(err)
      res.send("No projects found", err)
    }
    res.json(allAlbums)
  });
}

// POST /api/albums
function create(req, res) {
  // create an album based on request body and send it back as JSON
  var newAlbum = new db.Album({
    name: req.body.name,
    artistName: req.body.artistName,
    releaseDate: req.body.releaseDate,
    genres: req.body.genres.split(',')
    });
    newAlbum.save(function(err, savedAlbum) {
     res.json(savedAlbum);
   });
};


// GET /api/albums/:albumId
function show(req, res) {
  // find one album by id and send it back as JSON
}

// DELETE /api/albums/:albumId
function destroy(req, res) {
  // find one album by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/albums/:albumId
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
}

function newSong(req, res){
  db.Album.find({_id: req.body._id}, function(err, Album){
    if (err){
      console.log(err)
      res.send("No projects found", err)
    }
    res.json(Album);
});
}

// controllers/albumsController.js
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update,
  newSong: newSong
};
