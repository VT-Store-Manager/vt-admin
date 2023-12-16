import draggable from 'vuedraggable'

export default defineNuxtPlugin(({ vueApp }) => {
	vueApp.component('Draggable', draggable)
})
