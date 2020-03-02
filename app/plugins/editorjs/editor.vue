<template>
  <div>
    <div id="editor" />
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'

const editorConfig = {
    holderId: `editor`,
    autofocus: true,
    placeholder: `Empieza aqui a escribir`,
    tools: {
        paragraph: {
            class: Paragraph,
            inlineToolbar: [`bold`],
        },
    },
}
export default {
    props: {
        initialContent: {
            type: String,
            default: ``,
        },
    },
    data() {
        return {
            config: this.$configeditor,
        }
    },
    async mounted() {
        const self = this
        this.editor = new EditorJS(Object.assign({}, editorConfig, {
            data: JSON.parse(this.initialContent),
            async onChange() {
                try {
                    const content = await self.editor.save()
                    self.$emit(`input`, content)
                } catch (error) {
                }
            },
        }))
    },
    methods: {
        async onChange(e) {
            try {
                const content = await this.$refs.editor.editor.save()
                this.$emit(`input`, content)
            } catch (error) {
            }
        },
    },
}
</script>
<style>
.codex-editor__redactor {
    padding-bottom: 0px !important;
}
</style>
