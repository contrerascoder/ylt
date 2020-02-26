<template>
  <div>
    <div class="toolbar">
      <h2>Listado de cursos</h2>
      <span @click="addingCourse = true"><i class="fas fa-plus" /></span>
    </div>
    <div class="course-list">
      <course-item
        v-for="course in items"
        :key="course._id"
        :course="course"
      />
    </div>
    <add-course
      :activated="addingCourse"
      @close="addingCourse = false"
    />
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex"
import CourseItem from './course-item'
import AddCourse from './add-course'
export default {
    components: {CourseItem, AddCourse},
    data() {
        return {
            addingCourse: true,
        }
    },
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
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
