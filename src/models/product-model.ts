export interface AllProductInShortModel {
	product: {
		id: string
		name: string
		originalPrice: number
		categoryId: string
		categoryName: string
		images: string[]
	}[]
	category: {
		id: string
		name: string
		image: string
		countProduct: string
	}[]
	option: {
		id: string
		name: string
		items: string[]
		applying: number
	}[]
}
