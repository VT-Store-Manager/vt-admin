import _ from 'lodash'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			capitalize: _.capitalize,
		},
	}
})
