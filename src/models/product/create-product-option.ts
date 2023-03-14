import { ProductOptionModel, ProductOptionItem } from './product-option'

export type CreateNewProductOptionModel = Pick<
	ProductOptionModel,
	'name' | 'range'
> & {
	newItems: Pick<ProductOptionItem, 'name' | 'cost' | 'key'>[]
}

export type CreateProductSubOptionModel = Pick<
	ProductOptionModel,
	'parent' | 'range'
> & {
	childItems: Pick<ProductOptionItem, 'name' | 'cost' | 'key'>[]
}
