export interface EmployeeListItemModel {
	id: string
	store: string
	phone: string
	name: string
	avatar: string
	gender: keyof typeof Gender
	dob: Date
	createdAt: Date
	updatedAt: Date
}
