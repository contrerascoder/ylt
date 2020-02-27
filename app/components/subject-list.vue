<template>
  <div>
    <div class="toolbar">
      <h2>Asignaturas {{ course && course.abbr }}</h2>
      <div>
        <span @click="addingSubject = true"><i class="fas fa-plus" /></span>
        <span @click="editingCourse = true"><i class="fas fa-edit" /></span>
      </div>
    </div>
    <div class="subject-list">
      <subject-item
        v-for="subject in items"
        :key="subject._id"
        :subject="subject"
      />
    </div>
    <edit-course
      v-if="course"
      :activated="editingCourse"
      :course="course"
      @close="editingCourse=false"
    />
    <add-subject
      :activated="addingSubject"
      @close="addingSubject=false"
    />
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import EditCourse from './editor-course'
import AddSubject from './editor-subject'
import SubjectItem from './subject-item'
export default {
    components: {EditCourse, AddSubject, SubjectItem},
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
        ...mapState(`subjects`, [`items`]),
        course() {
            return this.$store.state.courses.items
                .filter((course) => course._id === this.courseId)[0]
        },
    },
    mounted() {
        this.fetchSubjects()
    },
    methods: {
        ...mapActions(`subjects`, [`fetchSubjects`]),
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
