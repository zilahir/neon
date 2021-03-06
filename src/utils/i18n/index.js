import LanguageDetector from 'i18next-browser-languagedetector'

import englishFile from './locales/en.json'
import hungarianFile from './locales/hu.json'

export const languages = [
	{
		key: 0,
		lng: 'en',
		label: 'English',
		en: 'English',
		hu: 'Angol',
		data: englishFile,
	},
	{
		key: 1,
		lng: 'hu',
		label: 'Hungarian',
		en: 'Hungarian',
		hu: 'Magyar',
		data: hungarianFile,
	},
]

let currentLanguage = languages[0]
const fallbackLanguage = languages[0]
const detector = new LanguageDetector()

/**
 * @param newLng
 */
export function setLanguage(newLng) {
	currentLanguage =
		languages.find(language => language.lng === newLng) || fallbackLanguage

	detector.cacheUserLanguage(currentLanguage.lng)
}

/**
 * @returns {string} the currentlyy applied language
 */
export function getLanguage() {
	return currentLanguage.lng
}

export const getActiveLanguage = () =>
	languages.find(currentLang => currentLang.lng === getLanguage())

/**
 * @param {string} data the piece we are looking for
 * @param {string} parts the path in the translation files
 * @returns {string} the found data in the language files
 */
function findPartsForData(data, parts) {
	let transation = data
	for (const part of parts) {
		if (transation[part] === undefined) {
			return
		}
		transation = transation[part]
	}
	if (typeof transation !== 'string') {
		return
	}
	return transation
}

/**
 * @param path
 * @param replacement
 * @returns {string} the localized piece of translated text
 */
export function t(path, replacement) {
	const parts = path.split('.')
	let translation =
		findPartsForData(currentLanguage.data, parts) ||
		findPartsForData(fallbackLanguage.data, parts)
	if (translation === undefined) {
		throw new Error(`Can't find translation for ${path}, for language: ${getLanguage()}`)
	}
	if (replacement) {
		for (const key in replacement) {
			translation = translation.replace(`{{${key}}}`, replacement[key])
		}
	}
	return translation
}

const languageDetector = new LanguageDetector()
languageDetector.init({
	languageUtils: {
		formatLanguageCode(lng) {
			return lng
		},
		isWhitelisted: () => true,
	},
	checkWhitelist: false,
})

setLanguage(languageDetector.detect())