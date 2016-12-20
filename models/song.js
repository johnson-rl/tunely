var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  // Author = require('./author');

var SongSchema = new Schema({
    trackNumber: Number,
    name: String
  });


// var BookSchema = new Schema({
//      title: String,
//      author: {type: Schema.Types.ObjectId, ref: 'Author'},
//      image: String,
//      releaseDate: String,
//      characters: [CharacterSchema]
// });

var Song = mongoose.model('Song', SongSchema);
module.exports = Song;
