var request = require('request')

exports.search = function(query, options, callback) {

  // http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching
  // options example:
  // options = {
  //    media: "movie" // options are: podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook, all
  //  , entity: "movie"
  //  , attribute: "movie"
  //  , limit: 50
  //  , explicit: "No" // explicit material
  // }

  var optionsString = "";

  for (item in options) {
    optionsString += "&" + item + "=" + encodeURIComponent(options[item]);
  }

  request("http://itunes.apple.com/search?country=us" + optionsString + "&term=" + encodeURIComponent(query), function(err, response, body) {
    callback( JSON.parse(body) )
  })

}
