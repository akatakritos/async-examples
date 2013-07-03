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

/**
 * Example of async.each
 *
 * The slowIterator function will be called for each item in the input array.
 * Becasuse each callback can take a different length of time, order cannot
 * be guaranteed.
 * 
 * @param  {Function} callback Called when example is comeplte
 */
function eachExample( callback ) {
	console.log("async.each");
	async.each( items, slowIterator, function( err ) {
		console.log();
		callback(err);
	});
}

/**
 * Example of async.eachSeries
 *
 * The slowIterator callback will be called for each item in the input array.
 * However, slowIterator will not becalled until the previous invocation has
 * completed. Order is guaranteed.
 * 
 * @param  {Function} callback Called when example is complete
 */
function eachSeriesExample( callback ) {
	console.log("async.eachSeries");
	async.eachSeries( items, slowIterator, function(err) {
		console.log();
		callback(err);
	});
}


/**
 * Example of async.eachLimit
 *
 * The slowIterator callback will be called for each item in the input array.
 * However, only a limited number of invocations will be allowed at once.
 * 
 * @param  {Function} callback Called when the example is complete
 * @return {[type]}            [description]
 */
function eachLimitExample( callback ){
	console.log("async.eachLimit");
	async.eachLimit( items, 3, slowIterator, function(err) {
		console.log();
		callback(err);
	});
}

async.series(
	[
		eachExample,
		eachSeriesExample,
		eachLimitExample
	]
);
