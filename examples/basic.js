const getMetaData = require('../lib')

const run = async function() {
	const url = 'https://www.sueddeutsche.de/politik/usa-joe-biden-ron-klain-1.5113555'
	const data = await getMetaData(url)
	console.log(data)
}

run()