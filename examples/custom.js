const getMetaData = require('../lib')

const options = {
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
	const data = await getMetaData('https://github.com/BetaHuhn/metadata-scraper', options)
	console.log(data)
}

run()