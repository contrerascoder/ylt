<template>
  <vue-form
    :payload="request"
    @success="() => resetForm() && postSuccess()"
    @notvalid="printErrors"
  >
    <form-field
      v-model="fields.name.value"
      :payload="fields.name"
    />
    <form-field
      v-model="fields.surname.value"
      :payload="fields.surname"
    />
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
import FormMixin from '@/mixins/form'
export default {
    mixins: [FormMixin],
    data() {
        return {
            fields: {
                name: {
                    hint: `Pon tu nombre`,
                    value: ``,
                    error: ``,
                },
                surname: {
                    hint: `Pon tus apellidos`,
                    value: ``,
                    error: ``,
                },
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
                name: this.fields.name.value,
                surname: this.fields.surname.value,
                email: this.fields.email.value,
                password: this.fields.password.value,
            }
            return {
                method: `post`,
                url: `/auth/signup`,
                data: data,
            }
        },
    },
    methods: {
        postSuccess() {
            setTimeout(() => {
                this.$emit(`registered`)
            }, 2000)
        },
    },
}
</script>
