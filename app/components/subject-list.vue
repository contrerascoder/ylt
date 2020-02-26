<template>
  <div>
    <div class="toolbar">
      <h2>Asignaturas {{ course && course.abbr }}</h2>
      <div>
        <span @click="addingSubject = true"><i class="fas fa-plus" /></span>
        <span @click="editingCourse = true"><i class="fas fa-edit" /></span>
      </div>
    </div>
    <edit-course
      v-if="course"
      :activated="editingCourse"
      :course="course"
      @close="editingCourse=false"
    />
  </div>
</template>

<script>
import EditCourse from './editor-course'

export default {
    components: {EditCourse},
    props: {
        courseId: {
            type: String,
            default: ``,
        },
    },
    data() {
        return {
            editingCourse: false,
            addingSubject: false,
        }
    },
    computed: {
        course() {
            return this.$store.state.courses.items
                .filter((course) => course._id === this.courseId)[0]
        },
    },
}
</script>

<style lang="scss" scoped>
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
