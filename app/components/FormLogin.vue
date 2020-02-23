<template>
  <vue-form
    :payload="request"
    @success="postSuccess"
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
import FormMixin from '@/mixins/form'
import {mapFields} from "vuex-map-fields"
export default {
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
        ...mapFields(`auth`, [`token`]),
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
        postSuccess(data) {
            this.$api.setHeader(`authorization`, data.token)
            this.resetForm()
            this.token = data.token
        },
    },
}
</script>
