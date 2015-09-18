var itunes = require('../lib/itunes');

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