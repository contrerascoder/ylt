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
        ref="editor"
        v-model="unitContent.contentEditor"
        :initial-content="unitContent.initalContent"
      />
    </template>
    <template v-else>
      <content-viewer
        v-if="studyContent"
        ref="studyContainer"
        :content="studyContent"
        @nextPage="forwardPage"
        @previousPage="previousPage"
      />
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
        <span
          v-if="mode === 'editing'"
          @click="setPage(Math.max(0, currentPage - 1))"
        ><i class="fas fa-arrow-left" /></span>
        <span
          v-else
          @click="$refs['studyContainer'].backward()"
        ><i class="fas fa-arrow-left" /></span>

        <span @click="showingUnits = true"><i class="fas fa-bars" /></span>

        <span
          v-if="mode === 'editing'"
          @click="setPage(Math.min(currentPage + 1, unitData.pages.length))"
        ><i class="fas fa-arrow-right" /></span>
        <span
          v-else
          @click="$refs['studyContainer'].forward()"
        ><i class="fas fa-arrow-right" /></span>
      </div>
      <div>
        <span
          v-if="mode === 'editing'"
          @click="addPage"
        ><i class="fas fa-plus-square" /></span>
        <span
          v-else
          @click="$refs['studyContainer'].calcNote()"
        ><i class="fas fa-check" /></span>
      </div>
    </div>
  </authed-user>
</template>

<script>
import ContentViewer from "@/components/unit/content-viewer"
export default {
    components: {ContentViewer},
    data() {
        return {
            mode: `editing`,
            showingUnits: false,
            notUpdate: false,
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
        studyContent() {
            if (this.unitData.pages.length === 0) {
                return
            }
            const pageId = this.unitData.pages[this.currentPage]._id
            return this.unitData.blocks[pageId]
        },
    },
    watch: {
        async 'unitContent.contentEditor'(newv, oldv) {
            if (typeof newv === `string`) {
                return
            }
            const currentPageId = this.unitData.pages[this.currentPage]._id
            const unit = {
                title: this.currentTitle,
                blocks: newv,
                currentPage: currentPageId,
            }
            await this.$api.put(`/units/` + this.$route.params.unit, unit)
        },
    },
    async mounted() {
        const self = this
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
            {handler: () => self.mode = `study`, text: `Modo estudio`} :
            {handler: () => self.mode = `editing`, text: `Modo editar`}
        this.configBar(this.unitData.title, [
            {handler: this.logout, text: `Cerrar sesion`},
            changeMode,
        ])
    },
    methods: {
        // Estos dos metodos solo se usan en modo estudio
        forwardPage() {
            if (this.currentPage >= (this.unitData.pages.length - 1)) {
                return
            }
            this.currentPage += 1
        },
        async addPage() {
            const number = Number(this.unitData.pages[this.currentPage].number) + 1
            const req = await this.$api.post(`/units/page/` + this.$route.params.unit + `?number=` + number)
            this.unitData.pages.splice(this.currentPage + 1, 0, req.data)
            this.setPage(this.currentPage + 1)
        },
        previousPage() {
            if (this.currentPage === 0) {
                return
            }
            this.currentPage -= 1
            setTimeout(() => {
                this.$refs[`studyContainer`].showAll()
            }, 100)
        },
        // Este metodo solo se usa en modo edicion
        setPage(index) {
            const totalPages = this.unitData.pages.length
            this.unitContent.initalContent = ``
            this.currentPage = index
            const page = this.unitData.pages[this.currentPage]
            if (!page) {
                if (this.currentPage < 0) {
                    this.currentPage = 0
                } else if (this.currentPage > totalPages - 1) {
                    this.currentPage = totalPages - 1
                }
                return
            }
            const pageId = page._id
            const content = JSON.stringify({
                blocks: this.unitData.blocks[pageId],
            })
            const self = this
            setTimeout(() => {
                self.unitContent.initalContent = content
                self.showingUnits = false
            }, 300)
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
    border-bottom: 1px black dotted;
    &:last-child {
      border: 0px;
    }
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
