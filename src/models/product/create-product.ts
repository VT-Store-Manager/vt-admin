import { ProductModel } from '.'

export interface CreateProductModel
	extends Pick<
		ProductModel,
		'name' | 'originalPrice' | 'description' | 'options'
	> {
	images: Array<File | Blob>
	category: string
}
