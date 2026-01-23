import { AIModelAvailability } from '@/hooks/use-check-ai'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
// Support both new API (window.LanguageModel) and old API (window.ai.languageModel)
const getLanguageModelApi = () => {
	if ('LanguageModel' in window && window.LanguageModel) {
		return window.LanguageModel
	}
	if ('ai' in window && window.ai?.languageModel) {
		return window.ai.languageModel
	}
	return null
}

export const getAiApi = () => {
	const api = getLanguageModelApi()
	if (!api) {
		throw new Error('Language Model API is not available')
	}
	return {
		create: api.create.bind(api),
	}
}

export async function checkSummarize() {
	function getChromeVersion() {
		var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)
		return raw ? parseInt(raw[2], 10) : 0
	}

	const version = getChromeVersion()
	if (version < 129 && !('ai' in globalThis)) {
		throw new Error(
			'Your browser is not supported. Please update to 129 version or greater'
		)
	}

	if (!('ai' in globalThis)) {
		throw new Error(
			'Prompt API is not available, check your configuration in chrome://flags/#prompt-api-for-gemini-nano'
		)
	}

	if (!window.ai.summarizer) {
		throw new Error('Summarize API is not available')
	}

	const canSummarize = await window.ai.summarizer.capabilities()
	const ready = canSummarize.available === 'readily'
	if (!ready) {
		throw new Error('Summarize AI API is not ready')
	}
}

export async function checkEnv() {
	function getChromeVersion() {
		var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)
		return raw ? parseInt(raw[2], 10) : 0
	}

	const version = getChromeVersion()
	if (version < 127) {
		throw new Error(
			'Your browser is not supported. Please update to 127 version or greater.'
		)
	}

	const api = getLanguageModelApi()
	if (!api) {
		throw new Error(
			'Prompt API is not available, check your configuration in chrome://flags/#prompt-api-for-gemini-nano'
		)
	}

	const state = await checkAiStatus()
	// Support both 'available' (new API) and 'readily' (old API)
	if (state !== 'available' && state !== 'readily') {
		throw new Error(
			'Built-in AI is not ready, check your configuration in chrome://flags/#optimization-guide-on-device-model'
		)
	}
}

export const checkAiStatus = async () => {
	const api = getLanguageModelApi()
	if (!api) {
		return 'unavailable' as AIModelAvailability
	}
	// New API uses availability(), old API uses capabilities()
	if (typeof api.availability === 'function') {
		return await api.availability()
	}
	if (typeof api.capabilities === 'function') {
		const capabilities = await api.capabilities()
		return capabilities.available as AIModelAvailability
	}
	return 'unavailable' as AIModelAvailability
}
export const convertTitleToPath = (title: string) => {
	return title.split(' ').join('_')
}
export const convertParamToTitle = (param: string) => {
	return param.split('_').join(' ')
}
