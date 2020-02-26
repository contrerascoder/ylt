<template>
  <authed-user :url="'/'">
    <course-list />
  </authed-user>
</template>

<script>
import CourseList from "@/components/course-list"
export default {
    components: {CourseList},
    mounted() {
        this.configBar(`Asignaturas`, [
            {handler: this.logout, text: `Cerrar sesion`},
        ])
    },
    head() {
        return {
            title: `Listado de asignaturas`,
        }
    },
}
</script>
