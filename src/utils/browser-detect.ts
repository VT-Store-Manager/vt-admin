export const getBrowserName = (
	agent = window.navigator.userAgent.toLowerCase()
) => {
	switch (true) {
		case agent.indexOf('edge') > -1:
			return 'MS Edge'
		case agent.indexOf('edg/') > -1:
			return 'Edge (chromium based)'
		case agent.indexOf('opr') > -1:
			return 'Opera'
		case agent.indexOf('chrome') > -1:
			return 'Chrome'
		case agent.indexOf('trident') > -1:
			return 'MS IE'
		case agent.indexOf('firefox') > -1:
			return 'Mozilla Firefox'
		case agent.indexOf('safari') > -1:
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

export const isOther = () => {
	return getBrowserName() === 'other'
}
