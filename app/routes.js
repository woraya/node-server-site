var express = require('express');     // require expressss
var path = require('path');
var requestify = require('requestify');
// var moment = require('moment');

var router = express.Router();        // create router
module.exports = router;              // export my router


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
  // res.render('pages/index');
});
 

var imageUrl;

router.post('/', function(req, res) {

  var lon = req.body.in_long;     // 105.75
  console.log(lon);             
  
  var lat = req.body.in_lat;      // 1.5
  console.log(lat);
  
  var currentDate = req.body.in_when;        //2017-03-11
  console.log(currentDate);

  // var currentDate = new Date(req.body.in_when);
  // console.log(currentDate);

  var cloudScore = 'True';
  var key = '51wchmkmVucm7c3e1gfe8epYWKeSKrDiA2faaSmz';

  // work fine =========================================================
    // var apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + key;

    // requestify.get(apiUrl)
    //   .then(function(response){
    //   var imageUrl = response.getBody().url;
    //   console.log(imageUrl);
    //   // send back to webpage
    //   res.send("<img src=" + imageUrl + "></img>");
    //  });
  // ====================================================================

  // first create an empty array
  var images = [];

  // get your current lat lon
  // define api credentials

  // define a for loop for 10 iterations
   for(var i = 0; i < 10; i++) {
      // countdown every 20 days
       var updateDate = currentDate - (i) + 20;
     
      // var img =  currentDate.setDate(currentDate.getDate - (i) * 20);
      // img = currentDate.toString();

      findImage(updateDate);
  }

  // define your requestify function
  function findImage(_updateDate){
      // find your current date and subtract 20 days from iteration
      var apiUrl = 'https://api.nasa.gov/planetary/earth/imagery?lon=' + lon + '&lat=' + lat + '&date=' + currentDate + '&cloud_score' + cloudScore + '&api_key=' + key;

      requestify.get (apiUrl)
        .then(function (response) {
        imageUrl = response.getBody();
        // console.log(imageUrl);

        // send back to webpage
        images.push(imageUrl);

        if(images.length == 10){
          res.json(images);
        }
    });
    // make a request to nasa with that date value
  }
});


router.get('/result', function(req, res) {
  res.sendFile(path.join(__dirname, '/result.html'));
  // res.send("<img src=" + imageUrl + "></img>");
  // res.render('pages/result');
});

// router.get(function(req, res, next) {
//   res.sendFile(path.join(__dirname, '/404.html'));
//   // res.render('pages/404');
// });

router.get('/poemList', function(req, res) {
  res.json({message: 'i am the poem list page'})
});