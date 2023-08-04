<template>
	<div>
		<div v-if="editor">
			<button
				:disabled="!editor.can().chain().focus().toggleBold().run()"
				:class="{ 'is-active': editor.isActive('bold') }"
				@click="editor.chain().focus().toggleBold().run()"
			>
				bold
			</button>
			<button
				:disabled="!editor.can().chain().focus().toggleItalic().run()"
				:class="{ 'is-active': editor.isActive('italic') }"
				@click="editor.chain().focus().toggleItalic().run()"
			>
				italic
			</button>
			<button
				:disabled="!editor.can().chain().focus().toggleStrike().run()"
				:class="{ 'is-active': editor.isActive('strike') }"
				@click="editor.chain().focus().toggleStrike().run()"
			>
				strike
			</button>
		</div>
		<editor-content :editor="editor" />
	</div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'

export default {
	components: {
		EditorContent,
	},

	data() {
		return {
			editor: null,
		}
	},

	mounted() {
		this.editor = new Editor({
			content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
			extensions: [Document, Paragraph, Text, Bold, Italic, Strike],
		})
	},

	beforeUnmount() {
		this.editor.destroy()
	},
}
</script>
