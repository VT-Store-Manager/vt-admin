import { ProductOptionModel, ProductOptionItem } from './product-option'

export type CreateNewProductOptionModel = Pick<
	ProductOptionModel,
	'name' | 'range'
> & {
	items: Pick<ProductOptionItem, 'name' | 'cost' | 'key'>[]
}

export type CreateProductSubOptionModel = Pick<
	ProductOptionModel,
	'parent' | 'range'
> & {
	items: Pick<ProductOptionItem, 'name' | 'cost' | 'key'>[]
}
