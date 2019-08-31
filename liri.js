//imports
require("dotenv").config();
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const spotifyReq= require("node-spotify-api");
const moment = require("moment.js");
const inrquirer = require("inquirer");
const figlet= require("figlet");
const fs= require("fs");
const axios= require("axios");


//functions 

let concertThis= (artist)=>{
    let URL= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios(URL)

}