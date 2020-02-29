<template>
  <div>
    <unit-list />
  </div>
</template>

<script>
import UnitList from '@/components/unit-list'
export default {
    components: {UnitList},
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
