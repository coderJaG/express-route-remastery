// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

app.use(express.json());

app.get('/artists/latest', (req, res) => {

  res.send(getLatestArtist());
});

app.get('/artists/latest/albums', (req, res) => {

  res.send(getAlbumsForLatestArtist());
});

app.get('/artists', (req, res) => {
  res.send(getAllArtists())
});

app.get('/artists/:artistId', (req, res) => {
  let userId = req.params.artistId;
  let data = getArtistByArtistId(userId);
  res.send(data);
});

app.put('/artists/:artistId', (req, res) => {
  let userId = req.params.artistId;
  const data = req.body;
  const edit = editArtistByArtistId(userId, data);
  res.send(edit);
});

app.patch('/artists/:artistId', (req, res) => {
  let userId = req.params.artistId;
  const data = req.body;
  const edit = editArtistByArtistId(userId, data);
  res.send(edit);
});

app.post('/artists', (req, res) => {
  let data = req.body;
  let added = addArtist(data);
  res.status(201)
  res.send(added);
});

app.delete('/artists/:artistId', (req, res) => {
  let userId = req.params.artistId;
  deleteArtistByArtistId(userId);
  const message = {
    "message": "Successfully deleted"
  };
  res.send(message);
});


app.get('/artists/:artistId/albums', (req, res) => {
  let artistId = req.params.artistId;
  const albums = getAlbumsByArtistId(artistId);
  res.send(albums);
});

app.get('/albums/:albumId', (req, res) => {
  let albumId = req.params.albumId;
  const album = getAlbumByAlbumId(albumId);
  res.send(album);
});

app.post('/artists/:artistId/albums', (req, res) => {
  const artistId = req.params.artistId;
  const data = req.body;
  const add = addAlbumByArtistId(artistId, data);
  res.status(201);
  res.send(add);
});


app.patch('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const data = req.body;
  const editAlbum = editAlbumByAlbumId(albumId, data);
  res.send(editAlbum);
});

app.put('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const data = req.body;
  const editAlbum = editAlbumByAlbumId(albumId, data);
  res.send(editAlbum);
});

app.delete('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  deleteAlbumByAlbumId(albumId)
  const message = {
    "message": "Successfully deleted"
  };
  res.send(message);
});

app.get('/albums', (req, res) => {
  let filter = req.query.startsWith;
  const albums = getFilteredAlbums(filter);
  res.send(albums);
});

app.get('/songs/:songId', ( req, res) => {
  const songId = req.params.songId;
  res.send(getSongBySongId(songId));
})


app.post('/albums/:albumId/songs', (req, res) => {
  const albumId = req.params.albumId;
  const data = req.body;
  const addSong = addSongByAlbumId(albumId, data);
  res.status(201)
  res.send(addSong);
});


app.get('/artists/:artistId/songs', ( req, res) => {
  const artistId = req.params.artistId;
  res.send(getSongsByArtistId(artistId));
})

app.get('/albums/:albumId/songs', ( req, res) => {
  const albumId = req.params.albumId;
  res.send(getSongsByAlbumId(albumId));
})

app.patch('/songs/:songId', (req, res) => {
  const songId = req.params.songId;
  const data = req.body;
  const editSong = editSongBySongId(songId, data);
  res.send(editSong);
});

app.put('/songs/:songId', (req, res) => {
  const songId = req.params.songId;
  const data = req.body;
  const editSong = editSongBySongId(songId, data);
  res.send(editSong);
});

app.delete('/songs/:songId', (req, res) => {
  const songId = req.params.songId;
  deleteSongBySongId(songId)
  const message = {
    "message": "Successfully deleted"
  };
  res.send(message);
});




// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}