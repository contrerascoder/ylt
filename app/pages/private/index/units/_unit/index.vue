<template>
  <authed-user :url="'/'">
    <template v-if="editing">
      <input
        v-model="currentTitle"
        class="unit-title"
        type="text"
        placeholder="Título de la unidad"
      >
      <editor-js
        v-if="unitContent.initalContent"
        v-model="unitContent.contentEditor"
        :initial-content="unitContent.initalContent"
      />
    </template>
    <template v-else>
      <p>Estudiando</p>
    </template>
    <template v-if="showingUnits">
      <div class="modal">
        <span
          class="modal__close"
          @click="showingUnits = false"
        ><i class="fas fa-times-circle" /></span>
        <div class="modal__content">
          <ul class="list-units">
            <li
              v-for="(page, index) in unitData.pages"
              :key="index"
              class="unit"
              @click="setPage(index)"
            >
              {{ page.title }}
            </li>
          </ul>
        </div>
      </div>
    </template>
    <div class="bottom-toolbar">
      <div>
        <span><i class="fas fa-arrow-left" /></span>
        <span @click="showingUnits = true"><i class="fas fa-bars" /></span>
        <span><i class="fas fa-arrow-right" /></span>
      </div>
      <div>
        <span><i class="fas fa-plus-square" /></span>
      </div>
    </div>
  </authed-user>
</template>

<script>
export default {
    data() {
        return {
            mode: `editing`,
            showingUnits: false,
            unitData: {
                title: ``,
                pages: [],
                blocks: [],
            },
            unitContent: {
                contentEditor: ``,
                initalContent: ``,
            },
            currentPage: 0,
        }
    },
    computed: {
        editing() {
            return this.mode === `editing`
        },
        currentTitle: {
            get() {
                if (this.unitData.pages.length === 0) {
                    return
                }
                return this.unitData.pages[this.currentPage].title
            },
            set(value) {
                this.unitData.pages[this.currentPage].title = value
            },
        },
    },
    watch: {
        'unitContent.contentEditor'(newv, oldv) {
            /* const data = {
                blocks: newv,
                title: this.currentTitle,
            }*/
            // console.log(`contenido cambiado`, data)
        },
    },
    async mounted() {
        const unitReq = await this.$api.get(`/units/` + this.$route.params.unit)
        this.unitData.title = unitReq.data.unit.title
        this.unitData.pages = unitReq.data.pages
        this.unitData.blocks = unitReq.data.blocks
        const pageId = this.unitData.pages[this.currentPage]._id
        const content = JSON.stringify({
            blocks: this.unitData.blocks[pageId],
        })
        this.unitContent.initalContent = content
        const changeMode = this.editing ?
            {handler: this.view, text: `Modo estudio`} :
            {handler: this.edit, text: `Modo editar`}
        this.configBar(this.unitData.title, [
            {handler: this.logout, text: `Cerrar sesion`},
            changeMode,
        ])
    },
    methods: {
        setPage(index) {
            this.currentPage = index
            this.showingUnits = false
        },
        getAllBlocks(blocks) {
            const listBlocks = []
            for (const page in blocks) {
                if (blocks.hasOwnProperty(page)) {
                    const element = blocks[page]
                    for (let index = 0; index < element.length; index++) {
                        const block = element[index]
                        listBlocks.push(block)
                    }
                }
            }
            return listBlocks
        },
    },
    head() {
        return {
            title: this.unitData.title,
        }
    },
}
</script>

<style lang="scss" scoped>
.unit-title {
  border: 0px;
  border-bottom: 1px solid;
  width: 100%;
  font-size: 1.4em;
}
.list-units {
  list-style-type: none;
  margin: 0;
  padding: 0;
  .unit {
    font-size: 1.3em;
    cursor: pointer;
  }
}
.modal {
  position: absolute;
  z-index: 1000;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.336);
  &__close {
    cursor: pointer;
    font-size: 1.8em;
    right: 10px;
    top: 10px;
    position: absolute;
    z-index: 2000;
  }
  &__content {
    padding: 10px;
    background: white;
    position: absolute;
    top: 50px;
    left: 10px;
    right: 10px;
    min-height: 200px;
  }
}
.bottom-toolbar {
  z-index: 500;
  display: flex;
  justify-content: space-between;
  position:fixed;
  bottom: 0px;
  background: steelblue;
  padding: 0.4em 0.3em;
  box-sizing: border-box;
  left: 0px;
  right: 0px;
  span > i {
    color: white;
    font-weight: bold;
    font-size: 1.8em;
    cursor: pointer;
  }
}
</style>
