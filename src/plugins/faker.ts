import { faker } from '@faker-js/faker'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			faker,
		},
	}
})
