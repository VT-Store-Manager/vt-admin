const localCache = new Map<string, any>()

const set = (key: string, data: any) => {
	localCache.set(key, data)
	setTimeout(() => {
		localCache.delete(key)
	}, 10000)
}

const get = (key: string) => {
	return localCache.get(key)
}

export default { set, get }
