<template>
  <div class="chat">
    <h2>Ventana de chat</h2>
    <div
      ref="messages"
      class="chat__messages"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="card message"
      >
        <p><strong>Mensaje mandado por {{ message.from.name }} {{ message.from.surname }} {{ message.dateAdded | formattedDate }}</strong></p>
        <p>{{ message.message }}</p>
      </div>
    </div>
    <div class="card chat__form">
      <vue-form
        :payload="request"
        @success="postSuccess"
        @notvalid="printErrors"
      >
        <template slot="sended">
          <span />
        </template>
        <form-field
          v-model="fields.message.value"
          :payload="fields.message"
        />
      </vue-form>
    </div>
  </div>
</template>

<script>
import {mapFields} from "vuex-map-fields"
import VueForm from '@/components/ui/vue-form'
import FormField from '@/components/ui/vue-form-field'
import FormMixin from "@/mixins/form"
import {NEW_MESSAGE} from "../../sockets/actions"
export default {
    components: {VueForm, FormField},
    filters: {
        formattedDate(val) {
            const date = new Date(val)
            return `${date.getDate()}/${date.getMonth().toString().padStart(2, `00`)}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
        },
    },
    mixins: [FormMixin],
    data() {
        return {
            messages: [],
            fields: {
                message: {
                    hint: `Pon un mensaje`,
                    value: ``,
                    error: ``,
                    type: `text`,
                },
            },
        }
    },
    computed: {
        ...mapFields(`auth`, [`token`]),
        request() {
            return {
                method: `post`,
                url: `/chat`,
                data: {
                    message: this.fields.message.value,
                },
                headers: {
                    authorization: this.token,
                },
            }
        },
    },
    async mounted() {
        const messagesRequest = await this.$api({
            url: `/chat`,
            headers: {
                authorization: this.token,
            },
        })
        this.messages = messagesRequest.data.messages

        /*
        this.socket.on(NEW_MESSAGE, (data) => {
            this.messages.push(data)
            window.scrollTo(0, document.body.scrollHeight)
        })*/
    },
    methods: {
        resetForm() {
            this.fields.message.value = ``
        },
        postSuccess(data) {
            this.resetForm()
        },
    },
}
</script>
