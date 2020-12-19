const getMetaData = require('../lib')

const options = {
	url: 'https://github.com/BetaHuhn/metadata-scraper',
	maxRedirects: 0, // default: 5
	ua: 'MyApp',
	lang: 'de-CH',
	timeout: 1000, // default: 10000
	forceImageHttps: false, // default: true
	customRules: {}
}

const run = async function() {
	const data = await getMetaData(options)
	console.log(data)
}

run()