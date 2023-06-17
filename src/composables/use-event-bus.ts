import mitt from 'mitt'
import { Pagination } from '~/types'

type ApplicationEvent = {
	'update-page': Pagination
} & Record<string, any>

const emitter = mitt<ApplicationEvent>()

export const useEmit = emitter.emit
export const useListener = emitter.on
export const useOmit = emitter.off
