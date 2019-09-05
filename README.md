# Liri-Bot
Welcome to Liri Bot! Liri bot is very much like siri, only instead of sound it needs text to make a search. So far it can only sear 3 things. Songs on spotify, upcoming concerts for artists/bands and movie information. 

# How to Use 

Using Liri bot is very simple. Once you start the application, simply select one of the 4 options. Once you select an option, you will be able to search for either a song, upcoming concert of movie. Once you search, Liri will return the information back to you. If you are not sure what to pick, just go for the 4th option. With the 4th option, Liri will randomly pick a category and make a random search. It will then return the results. To stop using Liri bot,navigate to "Quit" and hit enter.


# What was used

Node.js
moment.js
inquirer
fs
Spotify API
OMDB API
Bandsintown API
Javascript 

# Challenges 

The first challenge was going through the massive pile of information and getting the needed information. This was taking a while, but I decided to use Postman to make this process easier for me. Postman helped me view the information that I was getting from the API in a much cleaner version and it also insured that my get requests were working fine. 

The second challange was getting the random function to work properly. I struggled for wa while, but then I decided to create separate functions for getting spotify music, movie information or concert information and adding them to random function. This took care of the problem for me, but it was a length process. What I could've done better was plan the out the process better from the start and made the implementation of this function easier. 



