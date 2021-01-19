var express = require('express');
var router = express.Router();

const request = require('sync-request');

router.get('/', function(req, res, next) {
  

  res.render('index', {search_result : []});
});

router.post('/search_artist', (req,res,next) => {

  const result = request("GET","http://musicbrainz.org/ws/2/artist/?query="+req.body.search_input+"&fmt=json", {
    headers: {'user-agent': 'SearchBand/<0.0.2> ( https://github.com/SwannPnct )'}
  });
  const resultJSON = JSON.parse(result.getBody()).artists;

  console.log(resultJSON);

  res.render('index', {search_result : resultJSON})
})

router.get('/show_albums', (req,res,next) => {
  const result = request("GET", "http://musicbrainz.org/ws/2/artist/"+req.query.id+"?inc=release-groups&fmt=json", {
    headers: {'user-agent': 'SearchBand/<0.0.2> ( https://github.com/SwannPnct )'}
  });

  const albums = JSON.parse(result.getBody())["release-groups"];

  res.render('albums', {albums,
                        artist: JSON.parse(result.getBody()).name})
})

module.exports = router;
