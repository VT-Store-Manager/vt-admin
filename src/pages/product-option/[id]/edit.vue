<template>
	<div>Edit {{ $route.params.id }}</div>
</template>

<script lang="ts" setup>
import { EditProductOptionModel } from '~/models/product/product-option'

const productOptionData = reactive<EditProductOptionModel>({
	parent: undefined,
	name: '',
	range: [0, 1],
	parentItems: [],
	childrenItems: []
})
</script>
