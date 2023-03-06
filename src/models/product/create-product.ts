import { ProductModel } from '.'

export interface CreateProductModel
	extends Pick<
		ProductModel,
		'name' | 'category' | 'originalPrice' | 'description' | 'options' | 'image'
	> {}
