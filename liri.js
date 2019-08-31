//imports
require("dotenv").config();
const keys = require("./keys.js");
const spotifyReq= require("node-spotify-api");
const moment = require("moment");
const inrquirer = require("inquirer");
const figlet= require("figlet");
const fs= require("fs");
const axios= require("axios");
const spotify= new spotifyReq(keys.spotify)

//functions 

//artist and venu request
let concertThis= (artist)=>{
    let url= `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
    let finalInfo="";
    console.log(url)
    axios.get(url)
    .then(function(res){
       res.data.forEach((info)=>{
      console.log("************************************");
      finalInfo=console.log(`\n Name:${info.lineup[0]}, \n Venue location: ${info.venue.country},${info.venue.city}\n Date:${moment(info.datetime,"YYYY-MM-DD").format("MM/DD/YYYY")}\n`)});
        console.log("************************************");
      return finalInfo;  
    })
    .catch(function(){
        console.log("ERROR");
    })
}

//spotify request

let soptifyThisSong= (song)=>{
    let info="";
    spotify
  .search({ type: 'track', query: song,limit:1 })
  .then(function(res,error) {
      if(!error){
      res.tracks.items.forEach((data)=>{
        console.log("========================")
       info=console.log(`\n Artist(s): ${data.artists[0].name}, \n The song’s name: ${data.name}\n Spotify Link: ${data.preview_url}\n Album: ${data.album.name}`);
       return(info);
      })
      }
      else{
          return console.log(error);
      }
  })
  }






