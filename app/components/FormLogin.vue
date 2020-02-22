<template>
  <vue-form
    :payload="request"
    @success="() => resetForm() && postSuccess()"
    @notvalid="printErrors"
  >
    <form-field
      v-model="fields.email.value"
      :payload="fields.email"
    />
    <form-field
      v-model="fields.password.value"
      :payload="fields.password"
    />
  </vue-form>
</template>
<script>
import FormField from './ui/vue-form-field'
import VueForm from './ui/vue-form'
import FormMixin from '@/mixins/form'

export default {
    components: {FormField, VueForm},
    mixins: [FormMixin],
    data() {
        return {
            fields: {
                email: {
                    hint: `Pon tu correo electrónico`,
                    value: ``,
                    error: ``,
                    type: `text`,
                },
                password: {
                    hint: `Pon tu contraseña`,
                    value: ``,
                    error: ``,
                    type: `password`,
                },
            },
        }
    },
    computed: {
        request() {
            const data = {
                email: this.fields.email.value,
                password: this.fields.password.value,
            }
            return {
                method: `post`,
                url: `/auth/signin`,
                data: data,
            }
        },
    },
    methods: {
        postSuccess() {
            window.location.href = `/chat`
        },
    },
}
</script>
