var async = require("async");

function randomTimeout( func ) {
	setTimeout(func, Math.floor(Math.random() * 1000)+1);
}

function slowGetLength( item, callback ) {
	randomTimeout(function() {
		console.log("Getting length of item", item, ":", item.length);
		callback(null, item.length);
	});
}

var items = ["Matthew", "Mark", "Thaddeus", "Stephen"];

function sortByExample( callback ) {
	console.log("async.sortBy");
	async.sortBy( items, slowGetLength, function( err, results) {
		console.log("Result:", results);
		console.log();
		callback(null);
	});
}

async.series([
	sortByExample
]);