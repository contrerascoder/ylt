<template>
  <div>
    <no-ssr>
      <editor-js
        v-model="contentEditor"
        :initial-content="testContent"
      />
    </no-ssr>
  </div>
</template>

<script>
const content = `{}`
export default {
    data() {
        return {
            testContent: JSON.parse(content),
            contentEditor: null,
        }
    },
    mounted() {
        this.configBar(`Pagina de testing`, [
            {handler: this.logout, text: `Cerrar sesion`},
        ])
    },
    head() {
        return {
            title: `Pagina de testing`,
        }
    },
}
</script>
