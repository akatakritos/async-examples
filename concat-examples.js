var async = require("async");

function randomTimeout( func ) {
	setTimeout(func, Math.floor(Math.random() * 1000)+1);
}

function getCharacters( item, callback ) {
	randomTimeout(function() {

		var chars = [];
		for ( var i = 0, len = item.length; i < len; i++) {
			chars.push( item.charAt(i) );
		}

		console.log("Getting characters for", item, ":", chars);
		callback( null, chars );
	});
}

var items = ["Matthew", "Mark", "Thaddeus", "Stephen"];

function concatExample( callback ) {
	console.log("async.concat");
	async.concat( items, getCharacters, function( err, results ) {
		console.log("Results:", results);
		console.log();
		callback( null );
	});
}

function concatSeriesExample( callback ) {
	console.log("async.concatSeries");
	async.concatSeries( items, getCharacters, function( err, results ) {
		console.log( "Results:", results);
		console.log();
		callback( null );
	});
}

async.series([
	concatExample,
	concatSeriesExample
]);
