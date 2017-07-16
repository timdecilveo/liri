// reference: https://github.com/jahdasha/liri-node-app/blob/master/liri.js

var keysJsFile = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var argumentOne = process.argv[2];
var commandPrompts = ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"];

// ------------------------------------------------------------------------------------ //

switch(argumentOne){
  case commandPrompts[0]: // references my-tweets
    myTweets();
    break;
  case commandPrompts[1]: // references spotify-this-song
    spotifyThisSong();
    break;
  case commandPrompts[2]: // references movie-this
    movieThis();
    break;
  case commandPrompts[3]: // references do-what-it-says
    doWhatItSays();
    break;
}

//  ------------------------------------ Twitter ------------------------------------ //
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets(){
  var twitterHandle = process.argv[3];
  var getParamOne = "statuses/user_timeline/";
  var getParamTwo = {screen_name: twitterHandle};

  if(!twitterHandle){
    twitterHandle = "tim_decilveo";
  }

  var twitterKey = new Twitter({
    consumer_key: keysJsFile.twitterKeys.consumer_key,
    consumer_secret: keysJsFile.twitterKeys.consumer_secret,
    access_key: keysJsFile.twitterKeys.access_token_key,
    access_secret: keysJsFile.twitterKeys.access_token_secret
  });

  twitterKey.get(getParamOne, getParamTwo, function(error, tweets, response){
    // console.log("Tweets: " + JSON.stringify(error));
    console.log("Tweets: " + JSON.stringify(tweets));
    console.log("Response: " + JSON.stringify(response));
    // console.log("Tweets: " + JSON.parse(response));
    // console.log("Data Length: " + parseInt(data.length));
    if (error){
      // console.log("Error Message: " + JSON.stringify(error));
    }
    else if (!error){
      console.log(tweets);
      for(var i = 0; i < tweets.length; i++){
        console.log(tweets.length);
        console.log(twitterResults);
      }
    }
  })
}

//  -----//  ------------------------------------ Spotify ------------------------------------ //
function spotifyThisSong(){
  var songName = process.argv[3];
  if (!songName){
    songName = "The Sign";
  }
  // songNameEntered = songName;
  var spotifyKey = new Spotify({
    id: keysJsFile.spotifyKeys.id,
    secret: keysJsFile.spotifyKeys.secret
  });

  spotifyKey.search({ type: "track", query: songName }, function(error, data) {
    if (!error) {
      for (var i = 0; i < 4; i++){
        if (data != undefined){
          var tracksVar = data.tracks.items[i];
          var artistsVar = tracksVar.album.artists[0];
          // Artist(s)
          console.log("Artists: " + artistsVar.name);
          // The song's name
          console.log("Song's Name: " + tracksVar.name);
          // A preview link of the song from Spotify
          console.log("Preview Link: " + tracksVar.preview_url);
          // The album that the song is from
          console.log("Album Name: " + tracksVar.album.name);
        }
      }
    }
    else if (error){
      console.log('Error occurred: ' + error);
    }
  });
}

//  ------------------------------------ Movies ------------------------------------ //
function movieThis(){
  var movie = process.argv[3];
  if(!movie){
    movie = "Mr. Nobody";
  }

  movie = "http://www.omdbapi.com/?t=" + movie + "&apikey=40e9cece";

  request(movie, function (error, movieData, body) {
    if (!error) {
      var dataParse = JSON.parse(body);
      console.log("Title of the movie: " + dataParse.Title);
      console.log("Year the movie came out: " + dataParse.Year);
      console.log("IMDB Rating of the movie: " + dataParse.imdbRating);
      console.log("Rotten Tomatoes Rating of the movie: " + dataParse.Ratings[0].Value);
      console.log("Country where the movie was produced: " + dataParse.Country);
      console.log("Language of the movie: " + dataParse.Language);
      console.log("Plot of the movie: " + dataParse.Plot);
      console.log("Actors in the movie: " + dataParse.Actors);
    } else {
      console.log("Error :" + error);
      return;
    }
  });
}

//  ------------------------------------ Do What it Says ------------------------------------ //
function doWhatItSays(){
  // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
  // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
  var argumentTwo = process.argv[3];
  fs.readFile("random.txt", "utf8", function(error, data){
    var dataArr = data.split(",");
    if (error){
      console.log("Read File Error Message: " + error);
    }
    else if (argumentOne === "do-what-it-says" && argumentTwo === "my-tweets"){
      tweets = dataArr[1];
      myTweets();
    }
    else if (argumentOne === "do-what-it-says" && argumentTwo === "spotify-this-song"){
      songName = dataArr[1];
      console.log("This is a song name: " + songName);
      spotifyThisSong();
    }
    else if (argumentOne === "do-what-it-says" && argumentTwo === "movie-this"){
      movie = dataArr[1];
      movieThis();
    }
  });
}
