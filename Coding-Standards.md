## All languages

### Spelling

USA English should be used within your code. This is because the majority of modules are written in USA English, and it would cause useless inconsitencies in your code if in some places you used `color` and others `colour`.


### Indentation

Tabs should be used for indentation. This allows everyone who uses your code to view it with their ideal indentation size.


### Naming Convention

Class names should be CamelCase, while everything else should be camelCase. Acronyms should be treated specially, see example.

Example:

``` coffeescript
class JSONHandler
	toJSON: ->

jsonHandler = new JSONHandler()
jsonHandler.toJSON()
```


### Column Alignment

<table>
<tr><th>No Column Alignment</th><th>With Column Alignment</th></tr>
<tr><td><pre>one: 1
two: 2
three: 3
</pre></td><td><pre>one:    1
two:    2
three:  3
</pre></tr>
<tr>
<td>Best for when faster reading/cognition of row-by-row data is desired. Within code this is generally the vast majority of cases: e.g. key-value-pairs.</td>
<td>Best for when faster reading/cognition of column-by-column is desired. Within text this is generally the vast majority of cases: e.g. presenting table data. Align using spaces.</td>
</tr>
</table>


### Code Structure & Commenting

#### JavaDoc Format

Utilising of the JavaDoc format is decided per-project.


#### Sections

<pre># =====================================
# Main Section

# -------------------------------------
# Sub Section

# Group
...</pre>

Sections are used to indicate when the context of the code has changed, for instance grouping of particular functions or logic. Sections have two main advantages, they increase the speed of noticing and understanding context changes, as well as increasing the speed of cognition - without having to actually read any code.

The main sections and sub sections utilise a horiztonal rule. The last part of the horiztonal rule should always lay on the 40th column. The headings should be concise (only a few words max)

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

### JSHint Options

We utilise the following [jshint](http://www.jshint.com) [options](http://www.jshint.com/options/):

```
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