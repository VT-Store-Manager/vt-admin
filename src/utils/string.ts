import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { Gender, ImageType } from '~/constants'

export const variableCaseToText = (key: string) => {
	const result = key.replace(/([A-Z])/g, ' $1')
	const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
	return finalResult
}

export const temporaryUniqueKey = () => {
	const r =
		Math.random().toString(36).substr(2, 3) +
		'-' +
		Math.random().toString(36).substr(2, 3) +
		'-' +
		Math.random().toString(36).substr(2, 4)
	return r
}

export const toPascalCase = (text: string) => {
	const camelCaseStr = camelCase(text)
	return upperFirst(camelCaseStr)
}

export const readableFileSize = (bytes: number, decimalDigit = 2) => {
	const units = ['B', 'KB', 'MB', 'GB', 'TB']

	if (bytes === 0) {
		return '0 B'
	}

	const base = 1024
	const exponent = Math.floor(Math.log(bytes) / Math.log(base))
	const sizeInUnit = bytes / Math.pow(base, exponent)
	const formattedSize =
		Math.round(sizeInUnit * Math.pow(10, decimalDigit)) /
		Math.pow(10, decimalDigit)

	return `${formattedSize} ${units[exponent]}`
}

export const getAvatarDefaultUrl = (gender: keyof typeof Gender) => {
	switch (gender) {
		case 1:
			return '/img/default/avatar-female.svg'
		case 2:
			return '/img/default/avatar-male.svg'
		case 0:
		default:
			return '/img/default/avatar-male.svg'
	}
}

export const detectImageType = (image: string | File): ImageType => {
	if (image instanceof File) return ImageType.FILE
	if (s3KeyPattern.test(image)) return ImageType.INTERNAL
	return ImageType.EXTERNAL
}
