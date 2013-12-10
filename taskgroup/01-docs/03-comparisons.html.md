
### [Async.js](https://github.com/caolan/async)

The biggest advantage and difference of TaskGroup over async.js is that TaskGroup has one uniform API to rule them all, whereas with async.js I found that I was always having to keep referring to the async manual to try and figure out which is the right call for my use case then somehow wrap my head around the async.js way of doing things (which more often than not I couldn't), whereas with TaskGroup I never have that problem as it is one consistent API for all the different use cases.

Let's take a look at what the most common async.js methods would look like in TaskGroup:

``` javascript
// ====================================
// Series

// Async
async.series([
	function(){},
	function(callback){callback();}
], next);

// TaskGroup
new TaskGroup({
	tasks: [
		function(){},
		function(callback){callback();}
	],
	next: next
}).run();


// ====================================
// Parallel

// Async
async.parallel([
	function(){},
	function(callback){callback();}
], next);

// TaskGroup
new TaskGroup({
	concurrency: 0,
	tasks: [
		function(){},
		function(callback){callback();}
	],
	next: next
}).run();

// ====================================
// Map

// Async
async.map(['file1','file2','file3'], fs.stat, next);

// TaskGroup
new TaskGroup({
	concurrency: 0,
	tasks: ['file1', 'file2', 'file3'].map(function(file){
		return function(complete){
			fs.stat(file, complete);
		}
	}),
	next: next
}).run();
```

Another big advantage of TaskGroup over async.js is TaskGroup's ability to add tasks to the group once execution has already started - this is a common use case when creating an application that must perform it's actions serially, so using TaskGroup you can create a serial TaskGroup for the application, run it right away, then add the actions to the group as tasks.

A final big advantage of TaskGroup over async.js is TaskGroup's ability to do nested groups, this allowed us to created the [Joe Testing Framework & Runner](https://github.com/bevry/joe) incredibly easily, and because of this functionality Joe will always know which test (task) is associated to which suite (task group), whereas test runners like mocha have to guess (they add the task to the last group, which may not always be the case! especially with dynamically created tests!).

