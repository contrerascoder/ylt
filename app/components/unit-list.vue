<template>
  <div>
    <div class="toolbar">
      <h2>Unidades</h2>
      <div>
        <span @click="editingUnit = true"><i class="fas fa-plus" /></span>
      </div>
    </div>
    <div class="subject-list">
      <unit-item
        v-for="unit in items"
        :key="unit._id"
        :unit="unit"
      />
    </div>
    <edit-course
      v-if="course"
      :activated="editingCourse"
      :course="course"
      @close="editingCourse=false"
    />
    <add-unit
      :activated="editingUnit"
      @close="editingUnit=false"
    />
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import EditCourse from './editor-course'
import UnitItem from './unit-item'
import AddUnit from './editor-unit'
export default {
    components: {EditCourse, UnitItem, AddUnit},
    props: {
        courseId: {
            type: String,
            default: ``,
        },
    },
    data() {
        return {
            editingUnit: false,
        }
    },
    computed: {
        ...mapState(`units`, [`items`]),
        course() {
            return this.$store.state.courses.items
                .filter((course) => course._id === this.courseId)[0]
        },
    },
    mounted() {
        this.fetchUnits()
    },
    methods: {
        ...mapActions(`units`, [`fetchUnits`]),
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
