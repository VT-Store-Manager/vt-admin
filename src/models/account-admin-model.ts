export interface AccountAdminListItem {
	id: string
	username: string
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
	permissions: any[]
	updatedBy: UpdatedByModel
	createdAt: string
	updatedAt: string
}