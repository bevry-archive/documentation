'use strict'

// File Reader Class
class FileReader {

	// Read Files Asynchronously
	readFiles (files, next) {
		const results = []
		for (let i = 0, file, completed = 0; i < files.length; ++i) {
			file = files[i]
			require('fs').readFile(file, function (err, result) {
				// Check
				if (err) {
					i = files.length
					completed = files.length
					return next(err)
				}

				// Apply
				results.push(result.toString())

				// Check
				completed++
				if (completed === files.length) {
					return next(null, results)
				}
			})
		}
		return this
	}

	// Read Files Synchronously
	readFilesSync (files) {
		const results = []
		for (let i = 0, result, file; i < files.length; ++i) {
			file = files[i]
			try {
				result = require('fs').readFileSync(file)
			}
			catch (err) {
				throw err
			}
			// Apply
			results.push(result.toString())
		}
		return results
	}
}

// Read our files
const fileReader = new FileReader()
const files = ['difference-node.js', 'difference-php.php']

// Async
fileReader.readFiles(files, function (err, results) {
	if (err) throw err
	console.log('async:', results)
})

// Sync
const results = fileReader.readFilesSync(files)
console.log('sync:', results)
