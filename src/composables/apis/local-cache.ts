const localCache = new Map<string, any>()

const set = (key: string, data: any) => {
	localCache.set(key, data)
}

const get = (key: string) => {
	return localCache.get(key)
}

export default { set, get }
