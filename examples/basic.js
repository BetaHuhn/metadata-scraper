const getMetaData = require('../lib')

const run = async function() {
	const url = 'https://github.com/BetaHuhn/metadata-scraper'
	const data = await getMetaData(url)
	console.log(data)
}

run()