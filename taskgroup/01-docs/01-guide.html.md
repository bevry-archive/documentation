```
title: "Introduction Guide & Usage Examples"
```

[TaskGroup](https://github.com/bevry/taskgroup) provides two classes, `Task` and `TaskGroup`


### Tasks

Tasks are used to wrap a function (synchronous or asynchronous, it doesn't matter) inside a task execution flow.

This is useful as a consistent interface for executing tasks and doing something on their completion or failure, as well as catching uncaught errors and handling them safely.

We can define a synchronous task like so:

``` javascript
var Task = require('taskgroup').Task

// Create a task for our synchronous function
var task = new Task(function(){
	// Do something ...
	return "a synchronous result";

	// You can also return an error
	// return new Error("something went wrong")
});

// Add our completion callback for once the task has completed
task.done(function(err, result){
	// Do something now that the task has completed ...
	console.log([err, result]);
	/* [null, "a sychronous result"] */
});

// Execute the task
task.run();
```

And an asynchronous task like so:

``` javascript
var Task = require('taskgroup').Task

// Create a task for our synchronous function
var task = new Task(function(complete){
	// Do something asynchronous
	setTimeout(function(){
		// the error is the first callback argument, and the results the following arguments
		return complete(null, "an asychronous result");

		// So to provide an error instead, you would just pass over the first callback argument
		// return complete("something went wrong")
	}, 5000);  // execute the timeout after 5 seconds
});

// Add our completion callback for once the task has completed
task.done(function(err, result){
	// Do something now that the task has completed ...
	console.log([err, result]);
	/* [null, "an asychronous result"] */
});

// Execute the task
task.run();
```


### TaskGroup

Often at times, we want to execute multiple things and wait for the completion. TaskGroup makes this easy with the other class, `TaskGroup`.

We simply create a `TaskGroup` and add our Tasks to it!

``` javascript
var TaskGroup = require('taskgroup').TaskGroup

// Create our serial task group
var tasks = new TaskGroup();

// Add an asynchronous task to it
tasks.addTask(function(complete){
	setTimeout(function(){
		return complete(null, "a result");
	}, 5000);  // execute the timeout after 5 seconds
});

// Add a synchronous task to it
tasks.addTask(function(){
	return "a synchronous result";
});

// Add our completion callback for once the tasks have completed
tasks.done(function(err, results){
	console.log([err, result]);
	/* [null, [
		[null, "an asychronous result"],
		[null, "a sychronous result"]
	]] */
});

// Execute the task group
tasks.run();
```

Now by default, the TaskGroup will execute serially. This means that each task will execute one by one, waiting for the previous task to complete before moving on to the next task. This can also be considered having a concurrency of `1`. This is called _serial_ execution.

If we wanted to execute say two tasks at a time we could want a concurrency of `2`, or three tasks at a time, a concurrency of `3` would be set, or unlimited tasks at a time, a concurrency of `0` would be set.

We can customise the concurrency of the task group by passing it over as a configuration option, either via the TaskGroup constructor or via the `setConfig` method. Let's see what this would look like if we were do a concurrency of `0`. This is called _parallel_ execution.

``` javascript
var TaskGroup = require('taskgroup').TaskGroup

// Create our parallel task group
var tasks = new TaskGroup({concurrency:0});

// Add an asynchronous task to it
tasks.addTask(function(complete){
	setTimeout(function(){
		return complete(null, "a result");
	}, 5000);  // execute the timeout after 5 seconds
});

// Add a synchronous task to it
tasks.addTask(function(){
	return "a synchronous result";
});

// Add our completion callback for once the tasks have completed
tasks.done(function(err, results){
	console.log([err, result]);
	/* [null, [
		[null, "a sychronous result"],
		[null, "an asychronous result"]
	]] */
});

// Execute the task group
tasks.run();
```

Notice how the groups results are now in a different order. This occured because with parallel execution, we didn't have to wait for the asynchronous function to complete it's 5 second delay before executing and completing the second function (the synchronous one).

You can mix and match as many functions as you want with TaskGroups.


### Nested TaskGroups

You can also nest TaskGroups inside TaskGroups.

A common use case for this is when you would like a portion of your tasks to execute in parallel, and portion of your tasks to execute in serial.

Such a use case would look like so:

``` javascript
var TaskGroup = require('taskgroup').TaskGroup

// Create our serial task group
var tasks = new TaskGroup();

// Add the first serial task
tasks.addTask(function(){
	return "first serial task";
});

// Add a nested group of tasks that you would like executed in parallel
tasks.addGroup(function(addGroup, addTask){
	// Set this nested group to execute in parallel
	this.setConfig({concurrency: 0});

	// Add an asynchronous task to the nested group
	addTask(function(complete){
		setTimeout(function(){
			return complete(null, "a result");
		}, 5000);  // execute the timeout after 5 seconds
	});

	// Add a synchronous task to the nested group
	addTask(function(){
		return "a synchronous result";
	});
});

// Add the second serial task
tasks.addTask(function(){
	return "second serial task";
});

// Add our completion callback for once the tasks have completed
tasks.done(function(err, results){
	console.log([err, result]);
	/* [null, [
		[null, "first serial task"],
		[null, [
			[null, "a sychronous result"],
			[null, "an asychronous result"]
		]],
		[null, "second serial task"]
	]] */
});

// Execute the task group
tasks.run();
```


### Handling Errors

Safely handling errors is an important thing to do. TaskGroup makes this easy by safely catching any errors that your task may throw, isolating the destruction to the task alone, and providing to the task or taskgroup's completion callback.

When an error is detected, the remaining tasks in a TaskGroup will be cleared, and the TaskGroup's completion callback with the error will be fired.

``` javascript
var TaskGroup = require('taskgroup').TaskGroup

// Create our serial task group
var tasks = new TaskGroup();

// Add a synchronous task to the TaskGroup
tasks.addTask(function(complete){
	setTimeout(function(){
		return complete(new Error("the first task failed"))
	}, 5000);  // execute the timeout after 5 second
});

// Add a synchronous task to the TaskGroup
tasks.addTask(function(){
	return "the second task";
});

// Add our completion callback for once the tasks have completed
tasks.done(function(err, results){
	console.log([err, result]);
	/* [Error("the first task failed"), [
		[Error("the first task failed")]
	]] */
});

// Execute the task group
tasks.run();
```

Which comes in very handling with dealing with asynchronous parallel code:

``` javascript
var TaskGroup = require('taskgroup').TaskGroup

// Create our parallel task group
var tasks = new TaskGroup({concurrency: 0});

// Add an asynchronous task to the TaskGroup
tasks.addTask(function(){
	setTimeout(function(){
		return complete("the first task failed");
	}, 5000);  // execute the timeout after 5 seconds
});

// Add an asynchronous task to the TaskGroup
tasks.addTask(function(){
	setTimeout(function(){
		return complete("the second task failed");
	}, 1000);  // execute the timeout after 1 seconds
});

// Add our completion callback for once the tasks have completed
tasks.done(function(err, results){
	console.log([err, result]);
	/* [Error("the second task failed"), [
		[Error("the second task failed")]
	]] */
});

// Execute the task group
tasks.run();
```

Now even though the first task's completion callback still fires, it is successfully ignored, as the TaskGroup has exited.


### Notes

A common mistake for people coming from the complex land of promises, is that they may make code like this:

```
// Execute the task
task.run();

// Add our completion callback for once the task has completed
task.done(function(err, result){
	// Do something now that the task has completed ...
	console.log([err, result]);
	/* [null, "a sychronous result"] */
});
```

Expecting the completion callback to fire right away. However, as the TaskGroup is just an event emitter, the completion listener is only fired at the point in time when the `complete` event is emitted. As such, you should always add your completion listener before you run your task or taskgroup, never after.


### Graduation

Now you know all the essentials to getting started with coding the most amazing (a)synchronous parallel/serial code in your life. Enjoy!
