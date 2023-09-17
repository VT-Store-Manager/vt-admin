import moment from 'moment-timezone'
import 'moment/locale/vi'

moment.locale('vi')

export default defineNuxtPlugin(() => {
	return {
		provide: {
			moment,
		},
	}
})
