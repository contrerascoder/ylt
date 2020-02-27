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
      <form-field
        v-model="fields.abbr.value"
        :payload="fields.abbr"
      />
      <p>Pon un color para la asignatura</p>
      <input
        v-model="fields.color.value"
        type="color"
      >
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
        subject: {
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
            const courseId = this.$store.state.cache.lastCourse
            const data = {
                title: this.fields.title.value,
                abbr: this.fields.abbr.value,
                color: this.fields.color.value,
            }
            return this.editing ? {
                method: `put`,
                url: `/subjects/` + this.subject._id,
                data: data,
            } : {
                method: `post`,
                url: `/subjects?course=` + courseId,
                data: data,
            }
        },
    },
    mounted() {
        if (this.subject) {
            this.fields.title.value = this.subject.title
            this.fields.abbr.value = this.subject.abbr
            this.fields.color.value = this.subject.color
            this.editing = true
        }
    },
    methods: {
        ...mapMutations(`subjects`, [`set`, `add`]),
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
