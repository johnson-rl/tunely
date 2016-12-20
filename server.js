//require express and body parser
var express = require('express'),
  bodyParser = require('body-parser');

// connect to db models
var db = require('./models');

//connect to controllers
var controllers = require('./controllers');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//////////////
//Routes
//////////////

////Load index.html

app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

////Get controllers api
app.get('/api', controllers.api.index);

////Get all Albums
app.get('/api/albums', controllers.albums.index);
// app.get('/api/albums', function(req, res){
//   console.log("albums")
//   res.send("hello albums")
// })

////Create a new album
app.post('/api/albums', controllers.albums.create)

////Get one albumId
app.get('/api/albums/:album_id', controllers.albums.show)

////Add a song to an album
app.post('/api/albums/:album_id/songs', controllers.albums.newSong)


//Starting the listening
app.listen(process.env.PORT || 3000, function () {
   console.log('Example app listening at http://localhost:3000/');
 });
