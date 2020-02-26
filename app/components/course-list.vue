<template>
  <div>
    <h2>Listado de cursos</h2>
    <div class="course-list">
      <course-item
        v-for="course in items"
        :key="course._id"
        :course="course"
      />
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex"
import CourseItem from './course-item'
export default {
    components: {CourseItem},
    computed: {
        ...mapState(`courses`, [`items`]),
    },
    mounted() {
        this.fetchCourses()
    },
    methods: {
        ...mapActions(`courses`, [`fetchCourses`]),
    },
}
</script>
<style lang="scss" scoped>
.course-list {
    display: flex;
}
</style>
