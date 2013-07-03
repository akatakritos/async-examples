var async = require("async");

function randomTimeout( func ) {
	setTimeout(func, Math.floor(Math.random() * 1000)+1);
}

function slowIterator( item, callback ) {
	randomTimeout(function(){
		console.log( item );
		callback(null);
	});
}

var items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async.series(
	[
		function( cb ) {
			console.log();
			console.log( "async.each - The iterator callbacks are called asyncronously.");
			console.log( "They do not print in order because each callback takes a different length of time.");
			async.each( items, slowIterator, function( err ) { cb(err); });
		},

		function( cb ) {
			console.log();
			console.log( "async.eachSeries - every iterator callback is called asyncronously, but not until the previous callback has completed.");
			console.log( "They will print in order this time. Notice that it also takes much longer to complete.");
			async.eachSeries( items, slowIterator, function( err ) { cb(err); });
		},

		function( cb ) {
			console.log();
			console.log( "async.eachLimit - only x number of callbacks are allowed to run at once." );
			console.log( "Order is not maintained.");
			async.eachLimit( items, 3, slowIterator, function( err) { cb(err); });
		}
	]
);