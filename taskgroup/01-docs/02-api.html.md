### Task API

``` javascript
new (require('taskgroup')).Task()
```

- Available methods:
	- `constructor(args...)` - create our new task, arguments can be a String for `name`, an Object for `config`, and a Function for `next`
	- `setConfig(config)` - set the configuration for the group, returns chain
	- `getconfig()` - return the set configuration
	- `complete()` - will fire the completion event if we are already complete, useful if you're binding your listeners after run
	- `run()` - execute the task
- Available configuration:
	- `name`, no default - allows us to assign a name to the group, useful for debugging
	- `method(complete?)`, no default - must be set at some point, it is the function to execute for the task, if it is asynchronous it should use the completion callback provided
	- `args`, no default - an array of arguments that you would like to precede the completion callback when executing `fn`
	- `next` - alias for  `.once('complete', next)`
- Available events:
	- `run()` - fired just before we execute the task
	- `complete(err, args...)` - fired when the task has completed

### TaskGroup API

``` javascript
new (require('taskgroup')).TaskGroup()
```

- Available methods:
	- `constructor(name?,fn?)` - create our new group, arguments can be a String for `name`, an Object for `config`, and a Function for `next`
	- `setConfig(config)` - set the configuration for the group, returns chain
	- `getconfig()` - return the set configuration
	- `addTask(args...)`, `addTasks(tasks, args..)`  - create a new task item with the arguments and adds it to the group, returns the new task item(s)
	- `addGroup(args...)`, `addGroups(groups, args..)` - create a new group item with the arguments and adds it to the group, returns the new group item(s)
	- `addItem(item)`, `addItem(items)`  - adds the items to the group, returns the item(s)
	- `getTotals()` - returns counts for the following `{running,remaining,completed,total}`
	- `clear()` - remove the remaining items to be executed
	- `pause()` - pause the execution of the items
	- `stop()` - clear and pause
	- `exit(err)` - stop and complete, `err` if specified is sent to the completion event when fired
	- `complete()` - will fire the completion event if we are already complete, useful if you're binding your listeners after run
	- `run()` - start/resume executing the items, returns chain
	- All those of [EventEmitter2](https://github.com/hij1nx/EventEmitter2)
- Available configuration:
	- `name`, no default - allows us to assign a name to the group, useful for debugging
	- `method(addGroup, addTask, complete?)`, no default - allows us to use an inline and self-executing style for defining groups, useful for nesting
	- `concurrency`, defaults to `1` - how many items shall we allow to be run at the same time, set to `0` to allow unlimited
	- `pauseOnError`, defaults to `true` - if an error occurs in one of our items, should we stop executing any remaining items?
		- setting to `false` will continue with execution with the other items even if an item experiences an error
	- `items` - alias for  `.addTasks(items)`
	- `groups` - alias for  `.addGroups(groups)`
	- `tasks` - alias for  `.addTasks(tasks)`
	- `next` - alias for  `.once('complete', next)`
- Available events:
	- `run()` - fired just before we execute the items
	- `complete(err, results)` - fired when all our items have completed
	- `task.run(task)` - fired just before a task item executes
	- `task.complete(task, err, args...)` - fired when a task item has completed
	- `group.run(group)` - fired just before a group item executes
	- `group.complete(group, err, results)` - fired when a group item has completed
	- `item.run(item)` - fired just before an item executes (fired for both sub-tasks and sub-groups)
	- `item.complete(item, err, args...)` - fired when an item has completed (fired for both sub-task and sub-groups)
