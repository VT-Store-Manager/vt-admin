/* eslint-disable no-console */
export default defineNuxtPlugin(({ vueApp }) => {
	const authStore = useAuthStore()
	console.log('PLUGIN NE', authStore.auth)
})
