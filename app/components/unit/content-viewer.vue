<template>
  <div
    ref="viewer"
    class="viewer"
  >
    <div
      v-for="(block, index) in blocks"
      :key="index"
    >
      <div
        :is="`${block.type}-block`"
        :content="block.data"
        :mode="'exam'"
      />
    </div>
    <button @click="calcNote">
      Ver nota
    </button>
    <p v-if="note">
      Has sacado un {{ note }}
    </p>
  </div>
</template>

<script>
import ParagraphBlock from './paragraph-block'
import {stringSimilarity} from "string-similarity-js"

const DERECHA = 39
const IZQUIERDA = 37

export default {
    components: {ParagraphBlock},
    props: {
        content: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            note: false,
        }
    },
    computed: {
        blocks() {
            return this.content.blocks
        },
    },
    mounted() {
        window.onkeydown = (e) => {
            if (e.keyCode === DERECHA) {
                this.forward()
            } else if (e.keyCode === IZQUIERDA) {
                this.backward()
            } else {}
        }
    },
    methods: {
        forward() {
            const b = this.$refs.viewer.querySelectorAll(`.wb:not(.active)`)[0]
            if (b) {
                b.classList.add(`active`)
            } else {
                // pasar pagina
            }
        },
        backward() {
            const bs = this.$refs.viewer.querySelectorAll(`.wb.active`)
            const b = bs[bs.length - 1]
            if (b) {
                b.classList.remove(`active`)
            } else {
                // atrasar pagina
            }
        },
        calcNote() {
            let note = 0
            const viewer = this.$refs.viewer
            const inputs = viewer.querySelectorAll(`input`)
            const points = inputs.length
            for (let index = 0; index < inputs.length; index++) {
                const input = inputs[index]
                const [resUsuario, resVerdadera] = [
                    input.value.toLowerCase().trim(),
                    input.dataset.response.toLowerCase().trim(),
                ]

                if (stringSimilarity(resUsuario, resVerdadera) > 0.6) {
                    note += 1
                } else {
                    input.classList.add(`error`)
                    input.onchange = () => {
                        input.classList.remove(`error`)
                        input.oninput = null
                    }
                }
            }
            const notaFinal = note * 10 / points
            this.note = notaFinal.toFixed(2)
        },
    },
}
</script>
<style scoped>
.viewer {
    max-width: 768px;
    margin: 0 auto;
}
</style>
