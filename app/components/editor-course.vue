<template>
  <modal-box
    :title="editing ? 'Actualizando curso' : 'Añadir un curso'"
    :activated="activated"
    @close="$emit('close')"
  >
    <vue-form
      :payload="request"
      @success="postSuccess"
      @notvalid="printErrors"
    >
      <p>Pon un titulo para el curso</p>
      <form-field v-model="fields.title.value" />
      <p>Pon una abreviatura</p>
      <form-field v-model="fields.abbr.value" />
      <p>Pon un color para el curso</p>
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
        course: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            editing: false,
            fields: {
                title: {
                    hint: `Pon un titulo para el curso`,
                    value: ``,
                    error: ``,
                    type: `text`,
                },
                abbr: {
                    hint: `Pon una abreviatura para el curso`,
                    value: ``,
                    error: ``,
                    type: `text`,
                },
                color: {
                    hint: `Pon un color para el curso`,
                    value: ``,
                    error: ``,
                    type: `text`,
                },
            },
        }
    },
    computed: {
        request() {
            const data = {
                title: this.fields.title.value,
                abbr: this.fields.abbr.value,
                color: this.fields.color.value,
            }
            return this.editing ? {
                method: `put`,
                url: `/courses/` + this.course._id,
                data: data,
            } : {
                method: `post`,
                url: `/courses`,
                data: data,
            }
        },
    },
    mounted() {
        if (this.course) {
            this.fields.title.value = this.course.title
            this.fields.abbr.value = this.course.abbr
            this.fields.color.value = this.course.color
            this.editing = true
        }
    },
    methods: {
        ...mapMutations(`courses`, [`set`]),
        postSuccess(course) {
            this.set({id: this.course._id, course})
            this.$emit(`close`)
        },
    },
}
</script>
