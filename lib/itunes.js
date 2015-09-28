var request = require('request');


function setDefaultOptions(options, defaultOptions) {

  for (item in defaultOptions) {
    if (!options.hasOwnProperty(item)) {
      options[item] = defaultOptions[item];
    }
  }
  return options;
}


function generateURL(baseURL, options, defaultOptions) {

  options = setDefaultOptions(options, defaultOptions);

  var optionsString = Object.keys(options).map(function(item) {
    return item + "=" + encodeURIComponent(options[item])
  }).join("&");

  // iTunes uses application/x-www-form-urlencoded
  // so we replace space "%20" with "+"
  optionsString = optionsString.replace(/%20/g, "+");
    
  return baseURL + optionsString;
}


function makeRequest (url, callback) {

  request(url, function(err, response, body) {
    if (err) {
      callback(err, null);    
    } else if (response.statusCode !== 200) {
      callback("Bad response from iTunes server", null);
    } else {
      callback(null, JSON.parse(body));
    }
  });  
}


/**
http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching
options example:
options = {
   term: "field of dreams"
 , media: "movie" // options are: podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook, all
 , entity: "movie"
 , attribute: "movieTerm"
 , limit: 50
 , explicit: "No" // explicit material
 , country: "CA" // default US
};
*/
exports.search = function(options, callback) {

  var url = generateURL("http://itunes.apple.com/search?", options, {
    country: "US"
  });
    
  makeRequest(url, callback);
};


/**
http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#lookup
options example:
options = {
   id: 481473944
 , entity: "album"
 , limit: 25
 , sort: "recent"
 , country: "CA" // default US
};
*/
exports.lookup = function(options, callback) {

  var url = generateURL("http://itunes.apple.com/lookup?", options, {
    country: "US"
  });

  makeRequest(url, callback);
};