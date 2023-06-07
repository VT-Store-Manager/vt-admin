import mitt from 'mitt'

type ApplicationEvent = {
	'update-page': {
		page: number
		limit: number
	}
}

const emitter = mitt<ApplicationEvent>()

export const useEmit = emitter.emit
export const useListener = emitter.on
export const useOmit = emitter.off
