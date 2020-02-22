<template>
  <form
    class="form"
    @submit.prevent="sendRequest"
  >
    <slot name="sended">
      <div
        v-if="status"
        :class="classesForm"
      >
        {{ message }}
      </div>
    </slot>
    <slot />
    <div class="form__actions buttons">
      <input
        type="submit"
        class="button success"
        value="Enviar"
      >
    </div>
  </form>
</template>
<script>
export default {
    props: {
        'payload': {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            status: null,
        }
    },
    computed: {
        classesForm() {
            return {
                'form__result': true,
                "success": this.status < 400,
                "danger": this.status >= 400,
            }
        },
    },
    methods: {
        formatErrors({errors}) {
            const errorsFormatted = {}
            for (let index = 0; index < errors.length; index++) {
                const error = errors[index]
                if (!errorsFormatted[error.param]) {
                    errorsFormatted[error.param] = error.msg
                }
            }
            return errorsFormatted
        },
        sendRequest() {
            console.log(this.$api)

            /*
            this.$axios(this.payload)
                .then((r) => {
                    try {
                        this.status = r.status
                        this.message = r.data.message
                        this.$emit(`success`)
                    } catch (error) {

                    }
                }).catch(({response, message}) => {
                    try {
                        this.status = response.status
                        this.message = response.data.message
                        if (response.status === 422) {
                            this.$emit(`notvalid`, this.formatErrors(response.data))
                        } else if (response.status === 404) {
                            this.message = `Pagina no encontrada`
                        } else {}
                    } catch (error) {

                    }
                })*/
        },
    },
}
</script>
<style scoped lang="scss">
.form {
    &__actions {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        padding: 1em;
        padding-right: 0em;
    }
    &__result {
        padding: 1em 0.5em;
        margin: 0.5em 0em;
        border-left: 1px solid;
        &.danger {
            color: #803232;
            background: #ffeae6;
        }
        &.success {
            color: #328032;
            background: #c8ffc8;
        }
    }
}
</style>
