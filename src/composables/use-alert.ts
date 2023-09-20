import type { VAlert } from 'vuetify/components'

type AlertData = {
	text: string
	description?: string
	type: VAlert['$props']['type']
	duration?: number
}

export const useAlert = definePiniaStore('alert', () => {
	const data = ref<AlertData>({
		type: 'info',
		text: '',
		duration: 5000,
	})
	const show = ref(false)
	let showTimeout: NodeJS.Timeout

	const push = (_data: AlertData) => {
		data.value = _data
		show.value = true
	}

	const startTimeout = () => {
		if (!data.value.duration) return

		showTimeout = setTimeout(
			() => (show.value = false),
			data.value.duration + 500
		)
	}

	watch(show, value => {
		if (!value) clearTimeout(showTimeout)
	})

	return { data, show, push, startTimeout }
})
