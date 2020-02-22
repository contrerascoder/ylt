<template>
  <div class="field">
    <p class="field__hint">
      {{ payload.hint }}
    </p>
    <input
      id=""
      class="field__input"
      name=""
      :value="value"
      :type="payload.type || 'text'"
      @change="emitValue"
    >
    <p
      class="field__error"
    >
      {{ payload.error }}
    </p>
  </div>
</template>

<script>
export default {
    props: {
        'value': {
            type: String,
            default: ``,
        },
        'payload': {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        emitValue(e) {
            this.$emit(`input`, e.target.value)
        },
    },
}
</script>

<style scoped lang="scss">
.field {
    display: flex;
    flex-direction: column;
    &__hint {
        font-size: 1.5em;
    }
    &__input {
        font-size: 1.2em;
        padding: 0.25em;
        align-self: stretch;
    }
    &__error {
        color: tomato;
        font-size: 1.1em;
        font-weight: bold;
    }
}
</style>
