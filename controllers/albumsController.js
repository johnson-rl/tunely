
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
  db.Album.findOne({_id: req.params.album_id}, function(err, oneAlbum){
    if (err){
      console.log(err)
      res.send("No projects found", err)
    }
    res.json(oneAlbum)
  });
}

// DELETE /api/albums/:albumId
function destroy(req, res) {

  // find one album by id, delete it, and send it back as JSON

  db.Album.findOneAndRemove({ _id: req.params.album_id }, function(err, deletedAlbum) {
     res.json(deletedAlbum);
   });
}

// PUT or PATCH /api/albums/:albumId
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
}

function newSong(req, res){
  db.Album.find({_id: req.params.album_id}, function(err, foundAlbum){
    if (err){
      console.log(err)
      res.send("No projects found", err)
    }
    var songToSave
    songToSave = new Song (req.body)
    if(songToSave.trackNumber){
    foundAlbum[0].songs.push(songToSave)
    foundAlbum[0].save(function(err, savedSongInAlbum){
      if(err){
        res.json(err)
      }
      res.json(foundAlbum[0])
    })
    }
    // res.json(foundAlbum);
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
