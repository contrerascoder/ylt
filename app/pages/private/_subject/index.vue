<template>
  <div>
    <p>Vista de una unidad {{ $route.params.subject }}</p>
  </div>
</template>

<script>
export default {
    mounted() {
        this.configBar(`Vista de asignatura`, [
            {handler: this.logout, text: `Cerrar sesion`},
        ])
    },
    head() {
        return {
            title: `Vista de asignatura`,
        }
    },
}
</script>>
