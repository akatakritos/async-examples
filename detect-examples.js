var async = require("async");

function randomTimeout( func ) {
	setTimeout(func, Math.floor(Math.random() * 1000)+1);
}

function greaterThanFiveDetector( item, callback ) {
	randomTimeout(function() {
		console.log("Checking if ", item, " is > 5");
		callback( item > 5 );
	});
}

var items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function detectExample( callback ) {
	console.log("async.detect");
	async.detect( items, greaterThanFiveDetector, function(result) {
		console.log("First value found: ", result);
		
		//wait for all the callbacks to finish before ending the example
		setTimeout(function(){
			console.log();
			callback( null );
		}, 1000);
	});
}

function detectSeriesExample( callback ) {
	console.log("async.detectSeries");
	async.detectSeries( items, greaterThanFiveDetector, function(result) {
		console.log("First value found: ", result);
		console.log();
		callback( null );
	});
}

function someExample( callback ) {
	console.log("asyync.some");
	async.some( items, greaterThanFiveDetector, function(result) {
		console.log("Some greater than five: ", result);

		setTimeout(function() {
			console.log();
			callback(null);
		}, 1000);
	});
}

function everyExample( callback ) {
	console.log("async.every");
	async.every( items, greaterThanFiveDetector, function(result) {
		console.log("Every greater than five: ", result);

		setTimeout(function(){
			console.log();
			callback(null);
		}, 1000);
	});
}

async.series([
	detectExample,
	detectSeriesExample,
	someExample,
	everyExample
]);