import { ProductOptionModel } from './product-option'

export type CreateNewProductOptionModel = Pick<
	ProductOptionModel,
	'name' | 'maxSelect' | 'required' | 'items'
>

export type CreateProductSubOptionModel = Pick<
	ProductOptionModel,
	'parent' | 'maxSelect' | 'required' | 'items'
>
