var async = require("async");

function randomTimeout( func ) {
	setTimeout(func, Math.floor(Math.random() * 2000)+1);
}

function slowIterator( item, callback ) {
	randomTimeout(function(){
		console.log( item );
	});
}

var items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async.each( items, slowIterator, function( err) { console.log(err); });