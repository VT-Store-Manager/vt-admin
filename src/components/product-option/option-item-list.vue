<template>
	<div>
		<product-option-item
			v-for="n in amount"
			:key="n"
			ref="itemlistRef"
			@delete-item="onDeleteItem"
		/>
	</div>
</template>

<script lang="ts" setup>
interface Props {
	amount: number
}
interface Emits {
	(e: 'deleteItem'): void
}

defineProps<Props>()
defineEmits<Emits>()

const itemlistRef = ref(null)
const onDeleteItem = () => {
	console.log(itemlistRef.value?.map(el => [el.name, el.cost]))
}
</script>
