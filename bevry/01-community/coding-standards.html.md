## All languages

### Spelling

USA English should be used within your code. This is because the majority of modules are written in USA English, and it would cause useless inconsitencies in your code if in some places you used `color` and others `colour`.


### Indentation

Tabs should be used for indentation. This is because:

1. Tabs allow _everyone_ who uses your code to view it with their ideal indentation size, anything else would be oppressive
2. Tabs help prevent incorrect indentation, that can cause unsightly code, as well as errors in indentation based languages (a missing space is very difficult to notice)


### Column Alignment

Spaces (not tabs) should be used for column alignment. This is because:

1. Tabs can be displayed at different sizes based on the users configuration, meaning that for different users columns could be misaligned.
2. Spaces will always be displayed the same.

For when to use (or mot use) column alignment, refer to the following table:

_NOTE:_ the following table is not rendering correctly on bevry.me, [see it here instead.](https://github.com/bevry/documentation/blob/master/bevry/01-community/coding-standards.html.md#column-alignment)

<table>
<tr><th>No Column Alignment</th><th>With Column Alignment</th></tr>
<tr><td><code><pre>one: 1
two: 2
three: 3</pre></code></td>
<td><code><pre>one:    1
two:    2
three:  3</pre></code></tr>
<tr>
<td>Best for when faster reading/cognition of <strong>row-by-row</strong> data is desired. Within code this is generally the vast majority of cases (e.g., key-value-pairs).</td>
<td>Best for when faster reading/cognition of <strong>column-by-column</strong> is desired. Within text this is generally the vast majority of cases (e.g., presenting table data). Align using spaces.</td>
</tr>
</table>


### Naming Convention

Class names should be CamelCase, while everything else should be camelCase. Acronyms should be treated specially.


```coffeescript
class JSONHandler
	toJSON: ->

jsonHandler = new JSONHandler()
jsonHandler.toJSON()
```



### Code Structure & Commenting

#### JavaDoc Format

Use of the JavaDoc format is determined on a per-project basis.


#### Sections

```coffeescript
# =====================================
# Main Section

# -------------------------------------
# Sub Section

# Group
...
```

Sections indicate when the context of the code has changed (e.g., grouping of particular functions or logic). Sections have two main advantages: they make recognizing and understanding context changes faster, as well as increasing the speed of cognition—without having to actually read any code.

The main sections and sub-sections use a horizontal rule. The last part of the horizontal rule should always lay on the 40th column. Headings should be concise (only a few words).

Example:

```coffeescript
# =====================================
# DocPad Class

class DocPad

	# ---------------------------------
	# Variables

	# OutPath
	outPath: '...'

	# ---------------------------------
	# Construction & Initialization

	# Constructor
	constructor: ->
		# Prepare
		me = @

		# Log
		console.log('We are now constructing')

		# Chain
		@
	
	# Is Valid
	isValid: ->
		# Return
		true

```



## CoffeeScript

### Parentheses

Use parentheses as much as possible, especially when...:

- ...the function call only accepts a few arguments (e.g., `complete(err)`)
- ...the function call is before another statement (e.g., `return fatal(err)  if err`)
- ...the function call uses the `?` operator (e.g., `next?(err)`)

Occasionally, it’s okay to not use them. Some instances where it beneficial not use parentheses are:

- when the function call uses a single inline callback, which is the last argument (e.g., `path.exists __filename, (exists) ->`)
- when the function call accepts unlimited arguments (e.g., `console.log "Hello"`)


### Returning

Each function should have an explicit `return`. If it doesn't, then it should chain. If you wish to use CoffeeScripts automatic return ability, add a comment indicating it each and every time.


## JavaScript

### JSHint Options

We use the following [jshint](http://www.jshint.com) [options](http://www.jshint.com/docs/options/):

```coffeescript
// Enforcing
"eqeqeq": true,
"laxbreak": true,
"undef": true,
"newcap": true,
"noarg": true,
"strict": true,
"trailing": true,
"onecase": true,

// Relaxing
"boss": true,
"eqnull": true,
"evil": true,
"sub": true,
"regexdash": true,
"smarttabs": true,

// Environments
"browser": true,
"wsh": true,

// Legacy
"onevar": false
```


## Language Selection

Bevry uses CoffeeScript for all its non-[trivial](https://github.com/bevry/binaryextensions) modules.

With the use of Bevry's [base files](https://github.com/bevry/base) it is very easy to bootstrap a new project, and have compilation handled.

The biggest complaint we hear about the use of CoffeeScript is that it reduces contributors. We feel this is faulty argument. Here's why:

**The Rule of Generation** (from the [Unix Philosophy](http://en.wikipedia.org/wiki/Unix_philosophy)): Developers should avoid writing code by hand and instead write abstract high-level programs that generate code. This rule reduces humans errors and saves time.

**JavaScript** forces you to either:

- write unnecessarily complex code (that increases risk of error and decreases code readability and portability), *or* 
- include a library such as Underscore (to accomplish the same thing)

This causes arguments in the community about which libraries to use, which class system to use, which semicolon standard to use, which comma standard to use, and so on. These arguments add unnecessary noise to the community. The result is reduced effectiveness, reduced effeciency, and reduced contributors (due to standards that differ from what they're used to).

**CoffeeScript**, by contrast: 

- includes built-in high-level standard ways to do classes, `for…in` loops, `for…of` loops, bindings, etc.
- is easy to learn (can create code in a half a day, master in a week). 

This sidesteps most of the arguments about choice of libraries and coding standards. The result is increased contributors, increased effectiveness, and increased efficiency.

If we were to implement DocPad in JavaScript, we'd still be arguing to this day about which class system to use.


## Semantic Versioning

Bevry abides by [semantic versioning principles](http://semver.org/), that is to say:

- Major releases `v1`, contain breaking changes for everyone
- Minor releases `v1.1`, contain breaking changes for some people
- Patch releases `v1.1.1`, contain no breaking changes

When specifying dependencies, we will use the `~` operator at the start of the version number, like so: `~1.3.2`. This will allow versions after `1.3.2`, but before `1.4.0`.

We used to allow minor releases to be install automatically, but the resulting breaks were too much. Breaks could happen whenever our project is re-installed. This could happen during a production deployment; or when a new person installs your project; or simply when you come back to you project after a period of inactivity.

That's why we only allow patch releases to install automatically. 

[More information on this decision here.](https://github.com/npm/npm/issues/4587)


## Package Managers & Module Loaders

Bevry only publishes modules to the NPM registry, avoiding the Component and Bower package managers altogether.

In the past, we used to publish to the Component and Bower package managers, and include support for the module loaders, AMD, Require.js, and global namespacing (i.e. none). But it became overwhelming to manage them all.

The Component and Bower package managers both use git repositories as their registry, which requires you to bundle the production distribution of your packge with your source files in your git repository. Unfortunately, this bloats the repository, and pollutes its change history. And since neither package manager has a preferred module loader, the issue is complicated even further.

The module loaders AMD, Require.js, and global namespacing (i.e. none) require you to use a [UMD style header definition](https://github.com/docpad/docpad-plugin-umd#usage) in your projects pre-distribution. They also require an impractical number of testing to ensure that your library loads against each one. If you don't write all those tests, then you get error reports on how it doesn't work under an environment you don't use. So, you push a fix—and it breaks another environment you don't use.

With the CommonJS, NPM, Browserify, and Ender solution, you publish only your production files—not your source files—to the NPM registry. This keeps your repository's size lean, and preserves the integrity of changelogs beside production files. It also means that even if GitHub goes down (which happens a bit), you can still install things.

NPM + Browserify offer a lot of control over your packages, and you can even [add UMD headers at compile time](http://dontkry.com/posts/code/Browserify-and-the-universal-module-definition.html) if you insist on them. However, UMD lacks the beautiful simplicitly of CommonJS. Importing a module is as easy as `require('module-name')`. And you never have to worry about version conflicts (something that component users do have to worry about).

Ender also makes it easy for people who don't need the control (and complexity) of the NPM + Browserify solution to easily bundle and add libraries together into a production-ready buildfile.

But for those who want the ultimate simplicitly, tools like [Wzrd.in](http://wzrd.in) and [requirebin](http://requirebin.com) allow you to easily just create CDN ready distros of CommonJS NPM published modules right away, for instant inclusion in your application. Awesome.

It's for all these reasons that we feel that AMD, Require.js, Bower, and Component just cause headaches—whereas the CommonJS “utilitly belt” of NPM, Browserify, Ender, Wzrd.in, and requirebin comprise the ultimate solution.
