<template>
  <authed-user :url="'/'">
    <course-list v-model="lastCourse" />
    <subject-list :course-id="lastCourse" />
  </authed-user>
</template>

<script>
import CourseList from "@/components/course-list"
import SubjectList from '@/components/subject-list'
import {mapFields} from "vuex-map-fields"
export default {
    components: {CourseList, SubjectList},
    computed: {
        ...mapFields(`cache`, [`lastCourse`]),
    },
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
