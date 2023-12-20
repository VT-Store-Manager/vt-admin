import { array, object, string } from 'yup'

export interface AccountAdminListItem {
	id: string
	username: string
	avatar: string
	name: string
	roles: string[]
	stores: string[]
	createdAt: Date
	updatedAt: Date
}

export interface UpdatedByModel {
	accountId: string
	accountUsername: string
	time: string
}

export interface AccountAdminRoleItem {
	id: string
	name: string
	permissions: {
		featureName: string
		scopes: string[]
	}[]
	updatedBy: UpdatedByModel
	createdAt: string
	updatedAt: string
}

export interface AdminRolePermission {
	nameKeys: string[]
	permissionKeys: string[]
}

export type CreateAccountAdminModel = Pick<
	AccountAdminListItem,
	'username' | 'name' | 'roles' | 'stores'
>

export const createAccountAdminSchema = object<CreateAccountAdminModel>({
	username: string()
		.min(3)
		.matches(/[a-zA-Z0-9_.-]{3,}/)
		.required(),
	name: string().min(3).required(),
	roles: array(string().matches(objectIdPattern)).min(1),
	stores: array(string().matches(objectIdPattern)),
})
