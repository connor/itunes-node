var request = require('request')

exports.search = function(query, callback) {

  // TODO: allow an 'options' param for below...
  // TODO: allow specific media types, etc: https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching
	request("http://itunes.apple.com/search?country=us&term=" + query, function(err, response, body) {
	  callback( JSON.parse(body) )
	})

}
