## All languages

### [EditorConfig](http://editorconfig.org/)

[Get our `.editorconfig` configuration file](https://github.com/bevry/base/blob/master/.editorconfig)


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
<tr><td><pre>one: 1
two: 2
three: 3</pre></td>
<td><pre>one:    1
two:    2
three:  3</pre></tr>
<tr>
<td>Best for when faster reading/cognition of row-by-row data is desired. Within code this is generally the vast majority of cases: e.g. key-value-pairs.</td>
<td>Best for when faster reading/cognition of column-by-column is desired. Within text this is generally the vast majority of cases: e.g. presenting table data. Align using spaces.</td>
</tr>
</table>


### Naming Convention

Class names should be CamelCase, while everything else should be camelCase. Acronyms should be treated specially.


``` coffeescript
class JSONHandler
	toJSON: ->

jsonHandler = new JSONHandler()
jsonHandler.toJSON()
```



### Code Structure & Commenting

#### JavaDoc Format

Utilization of the JavaDoc format is decided per-project.


#### Sections

```
# =====================================
# Main Section

# -------------------------------------
# Sub Section

# Group
...
```

Sections are used to indicate when the context of the code has changed, for instance grouping of particular functions or logic. Sections have two main advantages, they increase the speed of noticing and understanding context changes, as well as increasing the speed of cognition - without having to actually read any code.

The main sections and sub sections utilise a horizontal rule. The last part of the horizontal rule should always lay on the 40th column. The headings should be concise (only a few words max)

Example:

```
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

### [CoffeeLint](http://www.coffeelint.org/) [Options](http://www.coffeelint.org/#options)

[Get our `coffeelint.json` configuration file](https://github.com/bevry/base/blob/master/coffeelint.json)


### Parenthesis

Use parenthesis as much as possible, especially when:

- when the function call only accepts a few arguments, e.g. `complete(err)`
- when the function call is before another statement, e.g. `return fatal(err)  if err`
- when the function call utilises the `?` operator, e.g. `next?(err)`

Occasionally it is okay to not use them, such instances where it beneficial not use parenthesis are:

- when the function call utilises a single inline callback, which is the last argument, e.g. `path.exists __filename, (exists) ->`
- when the function call accepts unlimited arguments, e.g. `console.log "Hello"`


### Returning

Each function should have an explicit return, if it doesn't then make it chain. If you wish to utilise CoffeeScripts automatic return ability, then a comment stating you are using this should be used each time.


## JavaScript

### [JSHint](http://www.jshint.com) [Options](http://www.jshint.com/docs/options/)

[Get our `.jshintrc` configuration file](https://github.com/bevry/base/blob/master/.jshintrc)


## Language Selection

Bevry uses CoffeeScript for all its non-[trivial](https://github.com/bevry/binaryextensions) modules.

With the use of Bevry's [base files](https://github.com/bevry/base) it is very easy to bootstrap a new project, and have compilation handled.

The biggest complaint we here about the use of CoffeeScript is it reduces contributors. We feel this is an artificial complaint, here's why.

- [Unix Philsophy](http://en.wikipedia.org/wiki/Unix_philosophy): Rule of Generation: Developers should avoid writing code by hand and instead write abstract high-level programs that generate code. This rule aims to reduce humans errors and save time
- CoffeeScript includes built-in high-level standard ways to do classes, for in loops, for of loops, bindings, etc
- JavaScript you either write unnecessarily complex code that increases risk of error and decreases code readability and portability, or include a library like underscore, just to do the same things
- This causes arguments in the JavaScript communities about which libaries to use, which class system to use, which semicolon standard to use, which comma standard to use, etc
- These arguments add unnecessary noise in the community, that reduce effectiveness, reduce effeciency, and reduces contributors due to the different standards being used than what they are used to
- CoffeeScript is easy to learn (can create code in a half a day, master in a week), and avoids these different coding standards and which-library arguments, increasing contributors, effectiveness, effeciency
- If we were to implement DocPad in JavaScript, we'd still be arguing to this day, which class system we should use


## Semantic Versioning

Bevry abides by [semantic versioning principles](http://semver.org/), that is to say:

- Major releases `v1`, contain breaking changes for everyone
- Minor releases `v1.1`, contain breaking changes for some people
- Patch releases `v1.1.1`, contain no breaking changes

When specifying dependencies, we will use the `~` operator at the start of the version number, like so `~1.3.2` which will allow versions after `1.3.2` but before `1.4.0`.

The reasoning why we only allow patch releases to automatically be installed, is that anything else could mean that when a re-install of our project happens, things could be broken. This could happen when doing a production deploy, a new person installs your project, or simply when you come back to you project after a while of inactivity.

We use to allow minor releases to be installed automatically, but the amount of breaks they caused from the situations above was too much, hence this standard of practice being put in place

[More information on this decision here.](https://github.com/npm/npm/issues/4587)


## Package Managers & Module Loaders

Bevry only publishes modules to the npm registry, avoiding the component and bower package managers altogether.

The reasoning for this is that we use to publish to the package managers component and bower, and include support for the module loaders AMD, Require.js, and Global Namespacing (aka none) — but it just become too much to manage and deal with.

The package managers Component and Bower both use git repositories as their registry, meaning that you must bundle the production distribution of your packge with your source files in your git repository. This makes your git repository get quite large, and pollutes the change history. Neither of these package managers, have any stance on which module loader you should use, creating extra complexity.

The module loaders AMD, Require.js, and Global Namespacing (aka none), require you to use a [UMD style header definition](https://github.com/docpad/docpad-plugin-umd#usage) in your projects pre-distribution. They also require an impratical amount of tests to be written ensuring your library loads against each one, or you don't write tests, and you get error reports on how it doesn't work under one of the environments you don't use, you push a fix, and it breaks another environment you don't use.

With the commonjs, npm, browserify, and ender solution. You publish only your production files to the npm registry, not your source files. This has the benefit of not polluting your repository's size and changelogs with production files, but it also means even if GitHub goes down (which happens a bit), you can still install things.

NPM + Browserify offer a lot of control over your packages, and you can even [add UMD headers to them at compile time](http://dontkry.com/posts/code/browserify-and-the-universal-module-definition.html) if you must insist, however UMD misses out on the amazing benefit of the beautiful simplicitly of commonjs. Importing a module is as easy as `require('module-name')` and you never have to worry about version conflicts either (something that component users do have to worry about).

Ender also makes it easy for people who don't need the control (and complexity) of the npm + browserify solution to easily be able to bundle and add libraries together into a production ready build file.

But for those who want the ultimate simplicitly, tools like [wzrd.in](http://wzrd.in) and [requirebin](http://requirebin.com/) allow you to easily just create CDN ready distros of commonjs npm published modules right away, for instant inclusion in your application. Awesome.

So for all those reasons, we feel the commonjs utilitly belt of npm, browserify, ender, wzrd.in and requirebin, is the ultimate solution. Whereas solutions like AMD, Require.js, bower and component, just cause headaches.
