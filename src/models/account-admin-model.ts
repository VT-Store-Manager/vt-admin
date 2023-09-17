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
