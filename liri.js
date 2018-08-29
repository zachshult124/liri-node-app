require("dotenv").config();

var keys = require("./keys.js");
var request = require('request');
var inputString = process.argv;
var userInput1 = inputString[2];
var userInput2 = inputString.slice(3).join(' ');
console.log(keys)

//Spotify requests
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//functions created for search inputs
function concertSearch(artist) {
    var BANDSINTOWN_QueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsInTown.id;
    request(BANDSINTOWN_QueryURL, function (error, response, body) {
        console.log(BANDSINTOWN_QueryURL)
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode);

        // Print the response status code if a response was received
        console.log('body:', JSON.parse(body)[0]);
    });
};

function spotifySearch() {
    spotify.search({ type: 'track', query: userInput2, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data);
    });
};

function movieSearch() {
    console.log('movie');
};

function doWhatItSays() {
    console.log('do what it says');
};

var search = function (input) {
    if (userInput1 === 'concert-this') {
        concertSearch(input);
    } else if (userInput1 === 'spotify-this-song') {
        spotifySearch(input);
    } else if (userInput1 === 'movie-this') {
        movieSearch(input);
    } else if (userInput1 === 'do-what-it-says') {
        doWhatItSays(input);
    } else { };
};

//Function call that begins script
search(userInput2);
