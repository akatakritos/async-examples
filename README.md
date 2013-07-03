async-examples
==============

Examples of using node.js [async](https://github.com/caolan/async) library.

Just clone to a testing directory then try each function with node.

Code comments have explanations.

````
$ node reduce-examples.js
async.reduce
Adding length of Matthew  to current sum  0
Adding length of Mark  to current sum  7
Adding length of Luke  to current sum  11
Adding length of John  to current sum  15
Result:  19

async.reduceRight
Adding length of John  to current sum  0
Adding length of Luke  to current sum  4
Adding length of Mark  to current sum  8
Adding length of Matthew  to current sum  12
Result:  19

async.map with a reduce
Mapping  Matthew  =>  7
Mapping  John  =>  4
Mapping  Mark  =>  4
Mapping  Luke  =>  4
Reducing with Array.prototype.reduce
Result:  19
````
