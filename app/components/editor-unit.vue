<template>
  <modal-box
    :title="editing ? 'Actualizando asignatura' : 'Añadir una asignatura'"
    :activated="activated"
    @close="$emit('close')"
  >
    <vue-form
      :payload="request"
      @success="postSuccess"
      @notvalid="printErrors"
    >
      <form-field
        v-model="fields.title.value"
        :payload="fields.title"
      />
    </vue-form>
  </modal-box>
</template>
<script>
import {mapMutations} from "vuex"
import ModalBox from "./ui/modal-box"
import FormMixin from '@/mixins/form'
export default {
    components: {ModalBox},
    mixins: [FormMixin],
    props: {
        activated: {
            type: Boolean,
            default: false,
        },
        unit: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            editing: false,
            fields: {
                title: {
                    hint: `Escribe el titulo`,
                    value: ``,
                    error: ``,
                    type: `text`,
                },
                abbr: {
                    hint: `Escribe la asignatura`,
                    value: ``,
                    error: ``,
                    type: `text`,
                },
                color: {
                    hint: `Pon un color para la asignatura`,
                    value: ``,
                    error: ``,
                    type: `text`,
                },
            },
        }
    },
    computed: {
        request() {
            const subject = this.$route.params.subject
            const data = {
                title: this.fields.title.value,
            }
            return this.editing ? {
                method: `put`,
                url: `/units/` + this.unit._id,
                data: data,
            } : {
                method: `post`,
                url: `/units?subject=` + subject,
                data: data,
            }
        },
    },
    mounted() {
        if (this.unit) {
            this.fields.title.value = this.unit.title
            this.editing = true
        }
    },
    methods: {
        ...mapMutations(`units`, [`set`, `add`]),
        postSuccess(subject) {
            if (this.editing) {
                this.set({id: subject._id, subject})
            } else {
                this.add(subject)
            }
            this.resetForm()
            this.$emit(`close`)
        },
    },
}
</script>
