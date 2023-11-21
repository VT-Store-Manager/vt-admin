/**
 * It returns the name of the browser based on the user agent string
 * @param agent - The user agent string.
 * @returns A function that returns a string.
 */
export const getBrowserName = (
	agent = window.navigator.userAgent.toLowerCase()
) => {
	switch (true) {
		case agent.includes('edge'):
			return 'MS Edge'
		case agent.includes('edg/'):
			return 'Edge (chromium based)'
		case agent.includes('opr'):
			return 'Opera'
		case agent.includes('chrome'):
			return 'Chrome'
		case agent.includes('trident'):
			return 'MS IE'
		case agent.includes('firefox'):
			return 'Mozilla Firefox'
		case agent.includes('safari'):
			return 'Safari'
		default:
			return 'other'
	}
}

export const isEdge = () => {
	const browserName = getBrowserName()
	return browserName === 'MS Edge' || browserName === 'Edge (chromium based)'
}

export const isOpera = () => {
	return getBrowserName() === 'Opera'
}

export const isChrome = () => {
	return getBrowserName() === 'Chrome'
}

export const isIE = () => {
	return getBrowserName() === 'MS IE'
}

export const isFirefox = () => {
	return getBrowserName() === 'Mozilla Firefox'
}

export const isSafari = () => {
	return getBrowserName() === 'Safari'
}

export const isOtherAgent = () => {
	return getBrowserName() === 'other'
}
