---
title: Using Joe
---


## Installing Joe

### Install Joe and the Default [Console Reporter](http://npmjs.org/package/joe-reporter-console)

``` bash
npm install --save joe joe-reporter-console
```


## Custom Reporters

### Using a Custom Reporter

Other reporters are available via the [npm registry with the keyword `joe-reporter`](https://npmjs.org/browse/keyword/joe-reporter).

Tell Joe which custom reporter to use like so:

### Via the Command Line

``` bash
node my-tests.js --joe-reporter=thenameofthecustomerreporter
```

### Via [Browserify](http://browserify.org/)

1. Add the following inside `my-tests.js`

	``` javascript
	require('joe').setReporter('thenameofthecustomerreporter')
	```

2. Bundle the reporter with your tests

	``` bash
	browserify -r joe-reporter-thenameofthecustomerreporter -e my-tests.js > my-tests-bundled.js 
	```

3. Add the bundled file to your website

	``` html
	<script src="my-tests-bundled.js"></script>
	```



## Writing Your Tests

### Include Joe

``` javascript
var assert = require('assert')
var joe = require('joe')
```

### Suites
A suite is a collection of tests. You define a suite by using:

``` javascript
suite("my suite's name", function (suite,test) {
	test("a test for my suite", function(){
		// the code to run in my test
	})
})
```

If you define your suite tests asynchronously, you can have your suite accept a completion callback that should be called once all your asynchronously created tests have been added:

``` javascript
suite("my suite's name", function (suite,test,complete) {
	// example setTimeout for creating a test asynchronously
	setTimeout(function(){
		test("a test for my suite", function(){
			// some code to run in my test
		})
		complete() // we have added all of our suite's tests
	}, 1000)
})
```


### Tests
Tests are defined by:

``` javascript
test("my test's name", function(){
	// some code to run inside my test
})
```

You can define asynchronous tests by accepting a completion callback like so:

``` javascript
test("my test's name", function(complete){
	// example readFile to showcase an asynchronous use case
	require('fs').readFile('some file', function(err, data){
		// some code to check the output is as expected and there is no error
		complete() // the test has now completed
	})
})
```


### Execution Order
When you define a test, it is added to the queue of its parent Suite, and executed in order synchronously once the Suite has reached has finished executing.

For instance, take the following example:

``` javascript
joe.suite('our suite', function (suite,test) {
	test('first test', function (complete) {
		setTimeout(function(){
			console.log('this will be outputted second')
			complete()
		}, 1000)
	})
	test('second test', function(){
		console.log('this will be outputted third')
	})
	console.log('this will be outputted first')
})
```

This will output:

```
our suite
this will be outputted first
our suite ➞  first test
this will be outputted second
our suite ➞  first test ✔
our suite ➞  second test
this will be outputted third
our suite ➞  second test ✔
our suite ✔

2/2 tests ran successfully, everything passed
```

Without the completion callback in the first test, it would complete as soon as it has finished executing, which means it would complete before the timeout has completed, meaning that the second test would execute before the first test has actually finished, which is why we have support for completion callbacks.

### Joe loves Chai
While completely independent of Joe, Joe works absolutely lovely with the [Chai](http://chaijs.com/) project. Chai provides us with assertions in the form of assert, should, and expect. It runs within the browser, and within node. It makes life a lot more lovely.


## Comparisons

### Mocha

- Mocha has no way to know exactly which tests are tied to which suites, it only guesses the relationship based on which tests and which suite was last created. So when creating your tests and suites asynchronously, it all falls down.
- Mocha will probably crash when your create your tests asynchronously. [More info](https://gist.github.com/2306572).
- Mocha requires custom reporters to be bundled within it, rather than as their own npm modules.
- Mocha tests must be run through the mocha runner, joe tests can be run directly

