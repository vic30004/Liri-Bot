//imports
require("dotenv").config();
const keys = require("./keys.js");
const spotifyReq = require("node-spotify-api");
const moment = require("moment");
const inrquirer = require("inquirer");
const figlet = require("figlet");
const fs = require("fs");
const axios = require("axios");
const spotify = new spotifyReq(keys.spotify)


let start = ()=>{
figlet('                           LIRI', function(err, data) {
    if (!err) {
        console.log("**************************************************************************************")
        console.log("                                    Hello, I am ")
        console.log(data)
        console.log("**************************************************************************************");
        let input = process.argv;
        input.splice(0,2);
        if (input.length===0){
            commands()
        }
        else {
            convert(input)
        }
    }
        else{
          console.log('Something went wrong...');
        console.log(err);
        }
        
    })
};

start()
//functions 
let randNum= (num)=>{
    return Math.floor(Math.random() *(num+1))
}


function pause(callback) {
    inrquirer.prompt([
        {
            type: "input",
            message: "Please press ENTER to continue.\n",
            name: "userInput",
        }
    ]).then(callback);
}

//artist and venu request
let concertThis = () => {
    inrquirer.prompt({
        type:"input",
        message:"What's the name of the artist/band?",
        name: "artist"
    }).then((res)=>{
    let url = `https://rest.bandsintown.com/artists/${res.artist}/events?app_id=codingbootcamp`;
    let finalInfo = "";
    console.log(url)
    axios.get(url)
        .then(function (res) {
            res.data.forEach((info) => {
                console.log("************************************");
                finalInfo = console.log(`\n Name:${info.lineup[0]}, \n Venue location: ${info.venue.country},${info.venue.city}\n Date:${moment(info.datetime, "YYYY-MM-DD").format("MM/DD/YYYY")}\n`)
            });
            console.log("************************************");
            return finalInfo;
        })
        .catch(function () {
            console.log("ERROR");
        })
        pause(commands)
    })
}

//spotify request

let soptifyThisSong = () => {
    let info = "";
    inrquirer.prompt({
        type:"input",
        message: "What's the name of the song?",
        name:"song"
    }).then((res)=>{
        spotify
        .search({ type: 'track', query: res.song, limit: 1 })
        .then(function (res, error) {
            if (!error) {
                res.tracks.items.forEach((data) => {
                    console.log("========================");
                    info = console.log(`\n Artist(s): ${data.artists[0].name}, \n The song’s name: ${data.name}\n Spotify Link: ${data.preview_url}\n Album: ${data.album.name}`);
                    console.log("========================");
                    return info;
                })
            }
            else {
                return console.log(error);
            }
        })
        pause(commands)
    })
    
}

//Movie request

const apiKey = "trilogy"

let movieInfo = () => {
    inrquirer.prompt({
        tyep:"input",
        message:"What's the name of the movie",
        name: "movie"

    }).then((res) => {
    let info = "";
    movie=res.movie;
    if(res.movie===""){
        
        res.movie="Mr. Nobody."
    }
    let url = `http://www.omdbapi.com/?t=${res.movie}&y=&plot=short&apikey=${apiKey}`;
    axios.get(url).then(function (res,err) {
        if(!err){
        let movieInfo = res.data
       return info = console.log(`Title: ${movieInfo.Title}\nYear: ${movieInfo.Year}\nIMDB Rating:${movieInfo.Ratings[0].Value}\nRotten Tomatoes Rating: ${movieInfo.Ratings[1].Value}\nCountry of Production: ${movieInfo.Country}\nLanguage: ${movieInfo.Language}\nPlot: ${movieInfo.Plot}\nActors: ${movieInfo.Actors}`);
        }
        else{
            console.log(err)
        }
    });
    pause(commands)
    })
    }

//Random option functions

//Movie

let choseMovie = (movie) =>{
    let url = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=${apiKey}`;
    let info=""
    axios.get(url).then(function (res,err) {
        if(!err){
        let movieInfo = res.data
       return info = console.log(`Title: ${movieInfo.Title}\nYear: ${movieInfo.Year}\nIMDB Rating:${movieInfo.Ratings[0].Value}\nRotten Tomatoes Rating: ${movieInfo.Ratings[1].Value}\nCountry of Production: ${movieInfo.Country}\nLanguage: ${movieInfo.Language}\nPlot: ${movieInfo.Plot}\nActors: ${movieInfo.Actors}`);
        }
        else{
            console.log(err)
        }
})
pause(commands)
}

//spotify

let chooseSpotify=(song)=>{
    spotify
        .search({ type: 'track', query: song, limit: 1 })
        .then(function (res, error) {
            if (!error) {
                res.tracks.items.forEach((data) => {
                    console.log("========================");
                    info = console.log(`\n Artist(s): ${data.artists[0].name}, \n The song’s name: ${data.name}\n Spotify Link: ${data.preview_url}\n Album: ${data.album.name}`);
                    console.log("========================");
                    return info;
                })
            }
            else {
                return console.log(error);
            }
        })
        pause(commands)
}

    let randomAction = ()=>{
        fs.readFile("random.txt","utf8", function(err, data){
            if(!err){
                let action= data.split(/\r\n|\n/);
                command=action[randNum(action.length - 1)];
               command= command.split(",");
               convert(command)
            }
        })
    }
    let convert = (arr)=>{
        let action = arr[0];
        arr.splice(0, 1);
        let input= arr.join(",")
        console.log(input)
        switch(action){
            case "Look up a song":
                chooseSpotify(input)
                break;
        }
        switch(action){
            case "Search a movie":
                choseMovie(input)
                break;
        }
        switch(action){
            case "Look for concerts":
                chooseConcert(input)
                break;
        }    
    }

    let chooseConcert= (artist)=>{
        let url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
        let finalInfo = "";
        axios.get(url)
            .then(function (res) {
                res.data.forEach((info) => {
                    console.log("************************************");
                    finalInfo = console.log(`\n Name:${info.lineup[0]}, \n Venue location: ${info.venue.country},${info.venue.city}\n Date:${moment(info.datetime, "YYYY-MM-DD").format("MM/DD/YYYY")}\n`)
                });
                console.log("************************************");
                return finalInfo;
            })
            .catch(function (err) {
                console.log(err);
            })
            pause(commands)
        }

let commands = ()=> {
    inrquirer.prompt([
        {
            type:"list",
            message:"What would you like to do?",
            choices: ["Look up a song","Search a movie","Look for concerts","Random action","Quit"],
            name:"choice"
        }
    ]).then(function(res){
        switch(res.choice){
            case "Look up a song":soptifyThisSong();
            break;
        };
        switch(res.choice){
            case "Search a movie": movieInfo();
            break;
        };
        switch(res.choice){
            case "Look for concerts": concertThis();
            break;
        }
        switch(res.choice){
            case "Random action": randomAction();
            break;
        }
        switch(res.choice){
            case "Quit": console.log("*****************************************")
            console.log("Good Bye!")
            console.log("*****************************************")
        }
    })
}

