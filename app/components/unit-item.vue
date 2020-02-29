<template>
  <div class="unit-container">
    <div class="unit">
      <h4
        class="unit__title"
      >
        <nuxt-link :to="'/private/unit/' + unit._id">
          {{ unit.title }}
        </nuxt-link>
      </h4>
    </div>
    <div class="controls">
      <span @click="editing=true"><i class="fas fa-edit" /></span>
    </div>
    <edit-unit
      :activated="editing"
      :unit="unit"
      @close="editing=false"
    />
  </div>
</template>
<script>
import EditUnit from './editor-unit'
export default {
    components: {EditUnit},
    props: {
        unit: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            editing: false,
        }
    },
}
</script>
<style lang="scss" scoped>
.unit-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .controls > span {
    font-size: 22px;
  }
}
.unit {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 4px 2px;
    &__box {
        height: 30px;
        width: 30px;
        border-radius: 100%;
        margin-right: 20px;
    }
    &__title {
    }
}
</style>
