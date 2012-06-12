itunes-node
===========

search against iTunes using nodejs

## installation

```js
npm install itunes-search
```

## example

```js

var itunes = require('itunes-search')

// http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching
// options example:
// options = {
//    media: "movie" // options are: podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook, all
//  , entity: "movie"
//  , attribute: "movie"
//  , limit: 50
//  , explicit: "No" // explicit material
// }
var options = {
    media: "movie"
  , entity: "movie"
  , limit: 25
}

itunes.search( "field of dreams", options, function(response) {
  // do stuff with 'response'
})

```
