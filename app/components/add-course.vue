<template>
  <modal-box
    title="Añadir un curso"
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
    },
    data() {
        return {
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
            return {
                method: `post`,
                url: `/courses`,
                data: data,
            }
        },
    },
    methods: {
        ...mapMutations(`courses`, [`add`]),
        postSuccess(course) {
            this.add(course)
            this.$emit(`close`)
        },
    },
}
</script>
