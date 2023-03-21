import { helpers } from '@vuelidate/validators'

export const timePattern = /^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$/

export const beTime = helpers.withMessage(
	'Time must be in hh:mm format',
	helpers.regex(timePattern)
)

export const beEndTime = (startTime: string) => {
	return helpers.withMessage(
		`Time must be in hh:mm format and later than ${startTime}`,
		(value: string) =>
			timePattern.test(startTime) &&
			timePattern.test(value) &&
			startTime < value
	)
}
