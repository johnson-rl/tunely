/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
// var sampleAlbums = [];
// sampleAlbums.push({
//              artistName: 'Ladyhawke',
//              name: 'Ladyhawke',
//              releaseDate: '2008, November 18',
//              genres: [ 'new wave', 'indie rock', 'synth pop' ]
//            });
// sampleAlbums.push({
//              artistName: 'The Knife',
//              name: 'Silent Shout',
//              releaseDate: '2006, February 17',
//              genres: [ 'synth pop', 'electronica', 'experimental' ]
//            });
// sampleAlbums.push({
//              artistName: 'Juno Reactor',
//              name: 'Shango',
//              releaseDate: '2000, October 9',
//              genres: [ 'electronic', 'goa trance', 'tribal house' ]
//            });
// sampleAlbums.push({
//              artistName: 'Philip Wesley',
//              name: 'Dark Night of the Soul',
//              releaseDate: '2008, September 12',
//              genres: [ 'piano' ]
//            });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');

  var albumSource = $('#albumTemplate').html();
  template = Handlebars.compile(albumSource);

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError
  });

  $('.form-horizontal').on('submit', function(e) {
    console.log('clicked')
     e.preventDefault();
     console.log('new project serialized', $(this).serializeArray());
     $.ajax({
       method: 'POST',
       url: '/api/albums',
       data: $(this).serializeArray(),
       success: newAlbumSuccess,
       error: handleError
     });
   });

   $('#albums').on('click', '.add-song', function(e) {
    // console.log('add-song clicked!');
    var id= $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    // console.log('id',id);
    $('#songModal').modal();
    $('#songModal').data('album-id', id);

    $('#saveSong').on('click', function(e) {
      e.preventDefault();
      var newSong = {};
      newSong.trackNumber = $('#trackNumber').val();
      newSong.name = $('#songName').val();
      newSong._id = $('#songModal').data('album-id');
      // console.log(newSong.serialize())
      $('#trackNumber').val('');
      $('#songName').val('');
      $.ajax({
        method: 'POST',
        url: '/api/albums/'+newSong._id+'/songs',
        data: newSong,
        success: newSongSuccess,
        error: newSongError
      });
      $.ajax({
        method: 'GET',
        url: '/api/albums/'+newSong._id,
        success: appendSong,
        error: appendSongError
      });
      // console.log(newSong);
});





  console.log('new book serialized', $(this).serializeArray());

});
// renderAlbum(sampleAlbums[0])

// sampleAlbums.forEach(renderAlbum);


  function handleSuccess(json){
    console.log('get all albums', json);
  json.forEach(renderAlbum);
  };

  function handleError(e) {
    console.log('uh oh', e);
    $('#appendAlbum').text('Failed to load albums, is the server working?');
  };

  function newAlbumSuccess(json){
    console.log(json);
    renderAlbum(json);
  }

  function newSongSuccess(json) {
    // $('#saveSong input').val('');
    // allBooks.push(json);
    // render();
    console.log('success',json)
  }

  function newSongError() {
    console.log('newbook error!');
  }

  function appendSong (json) {
    var albumsHtml = template(json);
     $('[data-album-id='+json._id+']').html(albumsHtml);
     $('#songModal').modal('hide');
     console.log("appended", json);
  }

  function appendSongError(err){
    console.log("not appended", err)
  }
});







// this function takes a single album and renders it to the page
function renderAlbum(album) {

  console.log('rendering album:', album);
var albumsHtml = template(album);
 $('#albums').append(albumsHtml);
};
