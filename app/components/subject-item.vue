<template>
  <div class="subject-container">
    <div class="subject">
      <div
        class="subject__box"
        :style="'background-color:' + subject.color"
      />
      <h4
        :title="subject.title"
        class="subject__title"
      >
        {{ subject.abbr }}
      </h4>
    </div>
    <div class="controls">
      <span @click="editing=true"><i class="fas fa-edit" /></span>
    </div>
    <edit-subject
      :activated="editing"
      :subject="subject"
      @close="editing=false"
    />
  </div>
</template>
<script>
import EditSubject from './editor-subject'
export default {
    components: {EditSubject},
    props: {
        subject: {
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
.subject-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .controls > span {
    font-size: 22px;
  }
}
.subject {
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
