import { useRouter } from 'vue-router'

const unauthorized = (error: any) => {
	if (process.client) {
		const router = useRouter()

		if (error.response?.status === 401) {
			router.push({ name: 'login' })
		}
	}
}

const isAborted = (error: any) => {
	return error.message.includes('The user aborted a request.')
}

export default { unauthorized, isAborted }
