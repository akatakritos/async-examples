var async = require("async");

function randomTimeout( func ) {
	setTimeout(func, Math.floor(Math.random() * 1000)+1);
}

function greaterThanFiveFilter( item, callback ){
	randomTimeout(function() {
		console.log("Testing ", item);
		callback( item > 5)
	});
}

var items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Example of async.filter
 *
 * Calls greaterThanFiveFilter for each item in parallel. If the filter calls
 * back with true, the item is added to the results array. Since each is called
 * in parallel, there is no guarantee about order they will be called. However, 
 * the results array will maintain the same order as the input.
 * 
 * @param  {Function} callback Called when example is complete
 */
function filterExample( callback ) {
	console.log("async.filter");
	async.filter( items, greaterThanFiveFilter, function( results ) {
		console.log("Results: ", results);
		console.log();
		callback( null );
	});

}

/**
 * Example of async.filterSeries
 *
 * Calls greaterThanFiveFilter for each item in series. This means order of 
 * invocation is maintained because each callback wont be called until the 
 * previous one finished. 
 * 
 * @param  {Function} callback Called when example is complete
 */
function filterSeriesExample( callback ) {
	console.log("async.filterSeries");
	async.filterSeries( items, greaterThanFiveFilter, function( results ) {
		console.log("Results: ", results);
		console.log();
		callback( null );
	});
	
}

/**
 * Example of async.reject
 *
 * Works exactly like async.filter except it keeps items that callback with
 * false.
 * 
 * @param  {Function} callback Called when example is complete
 */
function rejectExample( callback ) {
	console.log("async.reject");
	async.reject( items, greaterThanFiveFilter, function( results ) {
		console.log("Results: ", results);
		console.log();
		callback( null );
	});
	
}

/**
 * Example of async.rejectSeries
 *
 * Works exactly like async.filterSeries, except it keeps items that callback 
 * with false.
 * 
 * @param  {Function} callback Called when example is complete
 */
function rejectSeriesExample( callback ) {
	console.log("async.rejectSeries");
	async.rejectSeries( items, greaterThanFiveFilter, function( results ) {
		console.log("Results: ", results);
		console.log();
		callback( null );
	});
}

async.series(
	[
		filterExample,
		filterSeriesExample,
		rejectExample,
		rejectSeriesExample
	]
);