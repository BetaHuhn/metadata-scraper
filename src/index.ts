import got from 'got'
import * as domino from 'domino'

import { Options, Context, RuleSet, MetaData } from './types'
import { metaDataRules } from './rules'

const defaultOptions = {
	maxRedirects: 5,
	ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
	timeout: 10000,
	forceImageHttps: true,
	customRules: {}
}

const runRule = function(ruleSet: RuleSet, doc: Document, context: Context) {
	let maxScore = 0
	let value

	for (let currRule = 0; currRule < ruleSet.rules.length; currRule++) {
		const [ query, handler ] = ruleSet.rules[currRule]

		const elements = Array.from(doc.querySelectorAll(query))
		if (elements.length) {
			for (const element of elements) {
				let score = ruleSet.rules.length - currRule

				if (ruleSet.scorer) {
					const newScore = ruleSet.scorer(element, score)

					if (newScore) {
						score = newScore
					}
				}

				if (score > maxScore) {
					maxScore = score
					value = handler(element)
				}
			}
		}
	}

	if (value) {
		if (ruleSet.processor) {
			value = ruleSet.processor(value, context)
		}

		return value
	}

	if ((!value || value.length < 1) && ruleSet.defaultValue) {
		return ruleSet.defaultValue(context)
	}

	return undefined
}

const getMetaData = async function(url: string, inputOptions: Partial<Options> = {}) {
	const options = Object.assign({}, defaultOptions, inputOptions)

	const rules: Record<string, RuleSet> = { ...metaDataRules }
	Object.keys(options.customRules).forEach((key: string) => {
		rules[key] = {
			rules: [ ...metaDataRules[key].rules, ...options.customRules[key].rules ],
			defaultValue: options.customRules[key].defaultValue || metaDataRules[key].defaultValue,
			processor: options.customRules[key].processor || metaDataRules[key].processor
		}
	})

	let html
	if (!options.html) {
		const response = await got(url, {
			headers: {
				'user-agent': options.ua
			},
			timeout: options.timeout,
			...(options.maxRedirects === 0 ? { followRedirect: false } : { maxRedirects: options.maxRedirects })
		})
		html = response.body
	} else {
		html = url
		url = options.url || ''
	}

	const metadata: MetaData = {}
	const context: Context = {
		url,
		options
	}

	const doc = domino.createWindow(html).document

	Object.keys(rules).map((key: string) => {
		const ruleSet = rules[key]
		metadata[key] = runRule(ruleSet, doc, context) || undefined
	})

	return metadata
}

module.exports = getMetaData