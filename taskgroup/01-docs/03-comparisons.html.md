---
title: "Comparisons with other flow solutions"
---


### [Async.js](https://github.com/caolan/async)

The biggest advantage and difference of TaskGroup over async.js is that TaskGroup has one uniform API to rule them all, whereas with async.js I found that I was always having to keep referring to the async manual to try and figure out which is the right call for my use case then somehow wrap my head around the async.js way of doing things (which more often than not I couldn't), whereas with TaskGroup I never have that problem as it is one consistent API for all the different use cases.

Let's take a look at what the most common async.js methods would look like in TaskGroup:

``` javascript
// ====================================
// Series

// Async
async.series([
	function () {},
	function (callback) {
		callback()
	}
], next)

// TaskGroup via API
var tasks = TaskGroup.create().done(next)
tasks.addTask(function () {})
tasks.addTask(function (callback) {
	callback()
})
tasks.run()


// ====================================
// Parallel

// Async
async.parallel([
	function () {},
	function (callback) {
		callback()
	}
], next)

// TaskGroup via API
var tasks = TaskGroup.create({concurrency: 0}).done(next)
tasks.addTask(function () {})
tasks.addTask(function (callback) {
	callback ()
})
tasks.run()


// ====================================
// Map

// Async
async.map(['file1','file2','file3'], fs.stat, next)

// TaskGroup via API
var tasks = TaskGroup.create().done(next)
['file1', 'file2', 'file3'].forEach(function (file) {
	tasks.addTask(function(complete){
		fs.stat(file, complete);
	});
});
tasks.run();

// TaskGroup via API (same as before, but more concise)
TaskGroup.create().done(next).addTasks(
	['file1', 'file2', 'file3'].map((file) => (complete) => fs.stat(file, complete))
).run()
```

Another big advantage of TaskGroup over async.js is TaskGroup's ability to add tasks to the group once execution has already started - this is a common use case when creating an application that must perform its actions serially, so using TaskGroup you can create a serial TaskGroup for the application, run it right away, then add the actions to the group as tasks.

A final big advantage of TaskGroup over async.js is TaskGroup's ability to do nested groups, this allowed us to created the [Joe Testing Framework & Runner](https://github.com/bevry/joe) incredibly easily, and because of this functionality Joe will always know which test (task) is associated to which suite (task group), whereas test runners like mocha have to guess (they add the task to the last group, which may not always be the case! especially with dynamically created tests!).
