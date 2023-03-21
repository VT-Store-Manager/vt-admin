<template>
	<v-card>
		<v-card-title>
			<p>Content</p>
		</v-card-title>
		<v-card-item>
			<v-container>
				<v-row dense>
					<v-col
						cols="6"
						class="pb-0"
					>
						<base-form-input
							v-model="createData.name"
							label="Store name"
							:error-messages="v$.name.$errors.map(e => e.$message)"
							@input="v$.name.$touch"
							@blur="v$.name.$touch"
						/>
					</v-col>
					<v-col cols="3">
						<base-form-input
							v-model="createData.openTime.start"
							placeholder="07:00"
							label="Start time"
							:error-messages="v$.openTime.start.$errors.map(e => e.$message)"
							@input="v$.openTime.start.$touch"
							@blur="v$.openTime.start.$touch"
						/>
					</v-col>
					<v-col cols="3">
						<base-form-input
							v-model="createData.openTime.end"
							placeholder="21:30"
							label="End time"
							:error-messages="v$.openTime.end.$errors.map(e => e.$message)"
							@input="v$.openTime.end.$touch"
							@blur="v$.openTime.end.$touch"
						/>
					</v-col>
				</v-row>
				<v-row dense>
					<v-col
						cols="12"
						class="py-3"
					>
						<p>Address</p>
					</v-col>
					<v-col cols="7">
						<base-form-input
							v-model="createData.address.street"
							label="Address"
							:error-messages="v$.address.street.$errors.map(e => e.$message)"
							@input="v$.address.street.$touch"
							@blur="v$.address.street.$touch"
						/>
					</v-col>
					<v-col cols="5">
						<base-form-input
							v-model="createData.address.ward"
							label="Ward"
							:error-messages="v$.address.ward.$errors.map(e => e.$message)"
							@input="v$.address.ward.$touch"
							@blur="v$.address.ward.$touch"
						/>
					</v-col>
					<v-col cols="4">
						<base-form-input
							v-model="createData.address.district"
							label="District"
							:error-messages="v$.address.district.$errors.map(e => e.$message)"
							@input="v$.address.district.$touch"
							@blur="v$.address.district.$touch"
						/>
					</v-col>
					<v-col cols="4">
						<base-form-input
							v-model="createData.address.city"
							label="City"
							:error-messages="v$.address.city.$errors.map(e => e.$message)"
							@input="v$.address.city.$touch"
							@blur="v$.address.city.$touch"
						/>
					</v-col>
					<v-col cols="4">
						<base-form-input
							v-model="createData.address.country"
							label="Country"
							:error-messages="v$.address.country.$errors.map(e => e.$message)"
							@input="v$.address.country.$touch"
							@blur="v$.address.country.$touch"
						/>
					</v-col>
				</v-row>
				<v-row dense>
					<v-col
						cols="12"
						class="py-3"
					>
						<p>Unavailable goods</p>
					</v-col>
					<v-col cols="12">
						<base-form-select
							v-model="createData.unavailableGoods.product"
							label="Products"
							:items="productStore.productSelect"
							:loading="productStore.loading"
							chips
							multiple
							closable-chips
							clearable
							eager
							:error-messages="
								v$.unavailableGoods.product.$errors.map(e => e.$message)
							"
							@change="v$.unavailableGoods.product.$touch"
							@blur="v$.unavailableGoods.product.$touch"
						/>
					</v-col>
					<v-col cols="12">
						<base-form-select
							v-model="createData.unavailableGoods.category"
							label="Categorys"
							:items="productCategoryStore.categorySelect"
							:loading="productCategoryStore.loading"
							chips
							multiple
							closable-chips
							clearable
							:error-messages="
								v$.unavailableGoods.category.$errors.map(e => e.$message)
							"
							@change="v$.unavailableGoods.category.$touch"
							@blur="v$.unavailableGoods.category.$touch"
						/>
					</v-col>
					<v-col cols="12">
						<base-form-select
							v-model="createData.unavailableGoods.option"
							label="Options"
							:items="productOptionStore.getAllNameForSelect"
							:loading="productOptionStore.loading"
							chips
							multiple
							closable-chips
							clearable
							:error-messages="
								v$.unavailableGoods.option.$errors.map(e => e.$message)
							"
							@change="v$.unavailableGoods.option.$touch"
							@blur="v$.unavailableGoods.option.$touch"
						/>
					</v-col>
				</v-row>
			</v-container>
		</v-card-item>
	</v-card>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { CreateStoreModel } from '~/models/store'

const productStore = useProduct()
const productCategoryStore = useProductCategory()
const productOptionStore = useProductOptionList()

const refreshData = () => {
	Promise.all([
		productStore.fetch(),
		productCategoryStore.fetch(),
		productOptionStore.fetch()
	])
}

refreshData()

const initState: CreateStoreModel = {
	name: '',
	openTime: {
		start: '',
		end: ''
	},
	address: {
		street: '',
		ward: '',
		district: '',
		city: '',
		country: ''
	},
	unavailableGoods: {
		product: [],
		category: [],
		option: []
	}
}

const createData = reactive<CreateStoreModel>({ ...initState })

const rules = computed(() => ({
	name: { required },
	openTime: {
		start: { required, beTime },
		end: {
			required,
			...(timePattern.test(createData.openTime.start)
				? { beEndTime: beEndTime(createData.openTime.start) }
				: { beTime })
		}
	},
	address: {
		street: { required },
		ward: {},
		district: { required },
		city: { required },
		country: { required }
	},
	unavailableGoods: {
		product: {},
		category: {},
		option: {}
	}
}))

const v$ = useVuelidate(rules, createData)

defineExpose({ data: createData, validate: v$.value.$validate })
</script>
