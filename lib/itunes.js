var request = require('request')

exports.search = function(query, options, callback) {

  // TODO: allow specific media types, etc: https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching
	request("http://itunes.apple.com/search?country=us&term=" + encodeURI(query), function(err, response, body) {
	    callback( JSON.parse(body) )
	})

}

