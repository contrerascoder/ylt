<template>
  <div>
    <div
      class="course__box"
      :style="'background-color:' + course.color"
    />
    <h4 class="course__title">
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
    &__box {
        height: 50px;
        width: 50px;
    }
    &__title {
        text-align: center;
    }
}
</style>
