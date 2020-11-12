const getMetaData = require('../lib')

const run = async function() {
	const html = `
		<meta name="og:title" content="Example">
		<meta name="og:description" content="This is an example.">
	`
	const data = await getMetaData(html, { html: true, url: 'https://example.com' })
	console.log(data)
}

run()