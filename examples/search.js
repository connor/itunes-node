var itunes = require('../lib/itunes');

var options = {
	 term: "field of dreams"
 , media: "movie" // options are: podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook, all
 , entity: "movie"
 , attribute: "movieTerm"
 , limit: 50
 , explicit: "No" // explicit material
 , country: "CA" // default US
};

itunes.search(options, function(err, response) {
	if (err) {
		console.log(err);
	} else {
		console.log(response);
	}  
});