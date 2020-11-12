const getMetaData = require('../lib')

const options = {
	maxRedirects: 0, // default: 5
	ua: 'MyApp', // default: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
	timeout: 1000, // default: 10000
	forceImageHttps: false, // default: true
	customRules: {
		title: {
			rules: [
				[ 'meta[property="customTitle"][content]', (element) => element.getAttribute('content') ]
			],
			processor: (text) => text.toLowerCase()
		}
	}
}

const run = async function() {
	const url = 'https://www.sueddeutsche.de/politik/usa-joe-biden-ron-klain-1.5113555'
	const data = await getMetaData(url, options)
	console.log(data)
}

run()