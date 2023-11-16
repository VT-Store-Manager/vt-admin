import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'

export const getPhoneFormat = (
	phone: string,
	format = PhoneNumberFormat.NATIONAL
) => {
	const phoneUtil = PhoneNumberUtil.getInstance()
	const number = phoneUtil.parseAndKeepRawInput(phone, 'VN')

	const vnPhoneFormat = phoneUtil.formatOutOfCountryCallingNumber(number, 'VN')
	return vnPhoneFormat.replace(/^(\+?84)|0/, '(+84) ')
}
