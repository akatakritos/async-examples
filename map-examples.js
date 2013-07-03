var async = require("async");

function randomTimeout( func ) {
	setTimeout(func, Math.floor(Math.random() * 1000)+1);
}

function slowMapper( item, callback ) {
	randomTimeout(function(){
		var transformed = item * 10;
		console.log("Mapping " + item + " => " + transformed );
		callback(null, transformed);
	});
}

var items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Example of async.map.
 *
 * slowMapper will be called for each item in the items array. Because each 
 * invocation of slowMapper takes a different length of time (based on random 
 * timeout) the order in which they complete can not be guaranteed. This is 
 * faster, but unpredictable. As they finish, the results will be reassembled 
 * into an array in the same order as the input array.
 * 
 * @param  {Function} callback Called when the entire example is done
 */
function mapExample( callback ) {
	console.log("async.map");
	async.map( items, slowMapper, function( error, results) {
		console.log("Results: ", results);
		console.log();
		callback(error);
	});
}

/**
 * Example of async.mapSeries
 *
 * slowMapper will be called for each element of the items array. However, 
 * unlike async.map, each invocation of slowMapper will not happen until the
 * previous callback has completed. This will ensure that slowMapper is called
 * in the same order as the items.
 * 
 * @param  {Function} callback Called when the entire example is done
 */
function mapSeriesExample( callback ) {
	console.log("async.mapSeries");
	async.mapSeries( items, slowMapper, function(error, results) {
		console.log ( "Results: ", results);
		console.log();
		callback(error);
	});
}

/**
 * Example of async.mapLimit
 *
 * slowMapper will be called for each element of the items array. However, only
 * a limited number of callbacks will be called at once. This is useful for 
 * rate limiting expensive functions. 
 * 
 * @param  {Function} callback Called when the entire example is done
 */
function mapLimitExample( callback ) {
	console.log("async.mapLimit");
	async.mapLimit( items, 3, slowMapper, function( error, results) {
		console.log( "Results: ", results);
		console.log();
		callback(error);
	});
}

async.series(
	[
		mapExample,
		mapSeriesExample,
		mapLimitExample
	]
);