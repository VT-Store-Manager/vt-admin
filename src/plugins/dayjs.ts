import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/vi'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale('vi')
dayjs.tz.setDefault('Asia/Saigon')

export default defineNuxtPlugin(() => {
	return {
		provide: {
			dayjs,
		},
	}
})
