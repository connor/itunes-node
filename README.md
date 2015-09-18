itunes-node
===========

Search against iTunes using nodejs.

## Installation

```js
npm install itunes-search
```

## Search

[API Search reference](http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching)

```js
var itunes = require('itunes-search');

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
```

## Lookup

[API Lookup reference](http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#lookup)

```js
var itunes = require('itunes-search');

var options = {
   id: 481473944
 , entity: "album"
 , limit: 25
 , sort: "recent"
 , country: "CA" // default US
};

itunes.lookup(options, function(err, response) {
	if (err) {
		console.log(err);
	} else {
		console.log(response);
	}  
});
```