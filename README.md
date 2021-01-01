<div align="center">
	
# metadata-scraper

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/BetaHuhn/metadata-scraper/blob/master/LICENSE) ![David](https://img.shields.io/david/betahuhn/metadata-scraper) [![npm](https://img.shields.io/npm/v/metadata-scraper)](https://www.npmjs.com/package/metadata-scraper)

A Javascript library for scraping/parsing metadata from a web page.

</div>

## 👋 Introduction

[metadata-scraper](https://github.com/BetaHuhn/metadata-scraper) is a Javascript library which scrapes/parses metadata from web pages. You only need to supply it with a URL or an HTML string and it will use different rules to find the most relevant metadata like:

- Title
- Description
- Favicons/Images
- Language
- Keywords
- Author
- and more (full list [below](#-all-metadata))

## 🚀 Get started

Install [metadata-scraper](https://github.com/BetaHuhn/metadata-scraper) via npm:
```shell
npm install metadata-scraper
```

## 📚 Usage

Import `metadata-scraper` and pass it a URL or options object:

```js
const getMetaData = require('metadata-scraper')

const url = 'https://github.com/BetaHuhn/metadata-scraper'

getMetaData(url).then((data) => {
	console.log(data)
})
```

Or with `async`/`await`:

```js
const getMetaData = require('metadata-scraper')

async function run() {
	const url = 'https://github.com/BetaHuhn/metadata-scraper'
	const data = await getMetaData(url)
	console.log(data)
}

run()
```

This will return:

```js
{
	title: 'BetaHuhn/metadata-scraper',
	description: 'A Javascript library for scraping/parsing metadata from a web page.',
	language: 'en',
	url: 'https://github.com/BetaHuhn/metadata-scraper',
	provider: 'GitHub',
	twitter: '@github',
	image: 'https://avatars1.githubusercontent.com/u/51766171?s=400&v=4',
	icon: 'https://github.githubassets.com/favicons/favicon.svg'
}
```

You can see a list of all metadata which [metadata-scraper](https://github.com/BetaHuhn/metadata-scraper) tries to scrape [below](#-all-metadata).

## ⚙️ Configuration

You can change the behaviour of [metadata-scraper](https://github.com/BetaHuhn/metadata-scraper) by passing an options object:

```js
const getMetaData = require('metadata-scraper')

const options = {
	url: 'https://github.com/BetaHuhn/metadata-scraper', // URL of web page
	maxRedirects: 0, // Maximum number of redirects to follow (default: 5)
	ua: 'MyApp', // Specify User-Agent header
	lang: 'de-CH', // Specify Accept-Language header
	timeout: 1000, // Request timeout in milliseconds (default: 10000ms)
	forceImageHttps: false, // Force all image URLs to use https (default: true)
	customRules: {} // more info below
}

getMetaData(options).then((data) => {
	console.log(data)
})
```

You can specify the URL by either passing it as the first parameter, or by setting it in the options object.

## 📖 Examples

Here are some examples on how to use [metadata-scraper](https://github.com/BetaHuhn/metadata-scraper):

### Basic

Pass a URL as the first parameter and [metadata-scraper](https://github.com/BetaHuhn/metadata-scraper) automatically scrapes it and returns everything it finds:

```js
const getMetaData = require('metadata-scraper')
const data = await getMetaData('https://github.com/BetaHuhn/metadata-scraper')
```

Example file located at [examples/basic.js](/examples/basic.js).

---

### HTML String

If you already have an HTML string and don't want [metadata-scraper](https://github.com/BetaHuhn/metadata-scraper) to make an http request, specify it in the options object:

```js
const getMetaData = require('metadata-scraper')

const html = `
	<meta name="og:title" content="Example">
	<meta name="og:description" content="This is an example.">
`

const options {
	html: html, 
	url: 'https://example.com' // Optional URL to make relative image paths absolute
}

const data = await getMetaData(options)
```

Example file located at [examples/html.js](/examples/html.js).

---

### Custom Rules

Look at the `rules.ts` file in the `src` directory to see all rules which will be used.

You can expand [metadata-scraper](https://github.com/BetaHuhn/metadata-scraper) easily by specifying custom rules:

```js
const getMetaData = require('metadata-scraper')

const options = {
	url: 'https://github.com/BetaHuhn/metadata-scraper',
	customRules: {
		name: {
			rules: [
				[ 'meta[name="customName"][content]', (element) => element.getAttribute('content') ]
			],
			processor: (text) => text.toLowerCase()
		}
	}
}

const data = await getMetaData(options)
```

`customRules` needs to contain one or more objects, where the key (name above) will identify the value in the returned data. 

You can then specify different rules for each item in the rules array. 

The first item is the query which gets inserted into the browsers querySelector function, and the second item is a function which gets passed the HTML element:

```js
[ 'querySelector', (element) => element.innerText ]
```

You can also specify a `processor` function which will process/transform the result of one of the matched rules:

```js
{
	processor: (text) => text.toLowerCase()
}
```

If you find a useful rule, let me know and I will add it (or create a PR yourself).

Example file located at [examples/custom.js](/examples/custom.js).

# 📇 All metadata

Here's what [metadata-scraper](https://github.com/BetaHuhn/metadata-scraper) currently tries to scrape:

```js
{
	title: 'Title of page or article',
	description: 'Description of page or article',
	language: 'Language of page or article',
	type: 'Page type',
	url: 'URL of page',
	provider: 'Page provider',
	keywords: ['array', 'of', 'keywords'],
	section: 'Section/Category of page',
	author: 'Article author',
	published: 1605221765, // Date the article was published
	modified: 1605221765, // Date the article was modified
	robots: ['array', 'for', 'robots'],
	copyright: 'Page copyright',
	email: 'Contact email',
	twitter: 'Twitter handle',
	facebook: 'Facebook account id',
	image: 'Image URL',
	icon: 'Favicon URL',
	video: 'Video URL',
	audio: 'Audio URL'
}
```

If you find a useful metatag, let me know and I will add it (or create a PR yourself).

## 💻 Development

Issues and PRs are very welcome!

Please check out the [contributing guide](CONTRIBUTING.md) before you start.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). To see differences with previous versions refer to the [CHANGELOG](CHANGELOG.md).

## ❔ About

This library was developed by me ([@betahuhn](https://github.com/BetaHuhn)) in my free time. If you want to support me:

[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=394RTSBEEEFEE)

### Credits

This library is based on Mozilla's [page-metadata-parser](https://github.com/mozilla/page-metadata-parser). I converted it to TypeScript, implemented a few new features, and added more rules.

## License

Copyright 2020 Maximilian Schiller

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
