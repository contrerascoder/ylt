<template>
  <div
    class="course"
    @click="$emit('choose', course)"
  >
    <div
      class="course__box"
      :style="'background-color:' + course.color"
    />
    <h4
      :title="course.title"
      class="course__title"
    >
      {{ course.abbr }}
    </h4>
  </div>
</template>
<script>
export default {
    props: {
        course: {
            type: Object,
            default: () => {},
        },
    },
}
</script>
<style lang="scss" scoped>
.course {
  margin: 0px 10px;
    &__box {
        height: 50px;
        width: 50px;
        border-radius: 100%;
    }
    &__title {
        text-align: center;
    }
}
</style>
