<template>
  <div :class="modalClasses">
    <span
      class="modal__close"
      @click="$emit('close')"
    ><i class="fas fa-times" /></span>

    <div class="modal__content">
      <h3 class="modal__title">
        {{ title }}
      </h3>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
    props: {
        activated: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: `Modal sin titulo`,
        },
    },
    computed: {
        modalClasses() {
            return {
                activated: this.activated,
                modal: true,
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.modal {
  position: absolute;
  left: 0px;
  top: -100vh;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  transition: all .5s;
  &.activated {
    top: 0vh;
  }
  &__close {
    position: absolute;
    right: 0px;
    margin: 10px;
    font-size: 1.5em;
    color: white;
    font-weight: bold;
  }
  &__content {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    margin: 10px;
    background: white;
    padding: 2px;
    min-height: 200px;
    margin-top: 60px;
  }
  &__title {
    font-size: 1.6em;
    text-align: center;
  }
}
</style>
