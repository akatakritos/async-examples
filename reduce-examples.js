var async = require("async");

function randomTimeout( func ) {
	setTimeout(func, Math.floor(Math.random() * 1000)+1);
}

function sumOfLengthsReductor( memo, item, callback ) {
	randomTimeout(function() {
		console.log( "Adding length of", item, " to current sum ", memo );
		callback( null, memo + item.length );
	});
}

function mapToLength( item, callback ) {
	randomTimeout(function() {
		console.log( "Mapping ", item, " => ", item.length );
		callback(null, item.length);
	});
}

var items = ["Matthew", "Mark", "Luke", "John"]

/**
 * Example of async.reduce
 *
 * Calls sumReduction for each item in the array. This function operates in
 * series, so order is maintained. Its not terribly useful for this example,
 * but the docs point out that its good for when each step of the reduction
 * has to be asyncronous: perhaps you have too look up something from a 
 * webservice first. The mapreduce example will show a better way of doing that.
 * 
 * @param  {Function} callback Called when example is complete
 */
function reduceExample( callback ) {
	console.log("async.reduce");
	async.reduce( items, 0, sumOfLengthsReductor, function( err, result ) {
		console.log("Result: ", result);
		console.log();
		callback( err );
	});
}

/**
 * Example of async.reduceRight
 *
 * Works just like reduce example, except it operates on the items backwards
 * 
 * @param  {Function} callback Called when example is complete
 */
function reduceRightExample( callback ) {
	console.log("async.reduceRight");
	async.reduceRight( items, 0, sumOfLengthsReductor, function( err, result ) {
		console.log( "Result: ", result);
		console.log();
		callback( err );
	});
}

/**
 * Example of map-reduce algorithm. Uses Array.prototype.reduce.
 *
 * Map-Reduce is an important algorithm for data processing. In the first step
 * you map each of the inputs into a result. In the second step you aggragate 
 * those results into the final value.
 *
 * The mapping part can take place on multiple threads, CPUs, or even machines.
 * 
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function mapReduceExample( callback ) {
	console.log("async.map with a reduce");

	async.map( items, mapToLength, function( err, results ) {
		console.log("Reducing with Array.prototype.reduce");
		var reduction = results.reduce( function( memo, item ) { 
			return memo + item;
		}, 0);
		console.log("Result: ", reduction);
		console.log();
		callback( err );
	});
}

async.series([
	reduceExample,
	reduceRightExample,
	mapReduceExample
]);