<template>
  <div
    ref="viewer"
    class="viewer content"
  >
    <div class="header">
      <button @click="mode = 'study'">
        Ver
      </button>
      <button @click="mode = 'exam'">
        Examinarse
      </button>
    </div>
    <p
      v-if="note"
      class="note"
      @click="note=false"
    >
      Has sacado un {{ note }}
    </p>
    <div
      v-for="(block, index) in blocks"
      :key="index"
    >
      <div
        :is="`${block.type}-block`"
        :content="block.data"
        :mode="mode"
      />
    </div>
    <div class="footer">
      <button
        v-if="mode==='exam'"
        @click="calcNote"
      >
        Ver nota
      </button>
      <div v-if="mode==='study'">
        <button @click="forward">
          Adelante
        </button>
        <button @click="backward">
          Atras
        </button>
      </div>
    </div>
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
            mode: `study`,
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
.header {
  display: flex;
  justify-content: space-around;
}
.footer {
    position: fixed;
    bottom: 0px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    background: lightgrey;
}
.content {
    padding-bottom: 20px;
}
.note {
    font-size: 18px;
    font-weight: bold;
    position: fixed;
    top: 30px;
    background: steelblue;
    color: white;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.4em;
    width: 70%;
    text-align: center;
    box-sizing: border-box;
}
</style>
