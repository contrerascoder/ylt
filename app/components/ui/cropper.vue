<template lang="pug">
    div
        input(class="avatar-actioner" ref="input" type="file" name="image", accept="image/*" @change="setImage")
        .content
            template(v-if="!loading")
              section.cropper-area
                  div.img-cropper
                  .cropper-area
                      vue-cropper(v-if="imgSrc" style="align-self: center;" ref="cropper" :aspect-ratio="1 / 1" :src="imgSrc" preview=".preview")
                      .actions-cropping-container
                          .actions-cropping
                              a(href='#' role='button' @click.prevent='showFileChooser') Elegir imagen
              .buttons
                  button.button(@click="save") Guardar
            .flex-center.preview-area(v-else)
              img.preview(v-if="cropImg" :src="cropImg")
              pulse-loader
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || ``
    sliceSize = sliceSize || 512

    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, {type: contentType})
}

export default {
    components: {
        VueCropper, PulseLoader,
    },
    data() {
        return {
            imgSrc: false,
            cropImg: ``,
            data: null,
            loading: false,
        }
    },
    methods: {
        cropImage() {
            // get image data for post processing, e.g. upload or setting image src
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
        },
        save() {
            this.cropImage()
            const type = this.cropImg.split(`;`)[0].replace(`data:`, ``)
            const file = b64toBlob(this.cropImg.split(`,`)[1], type)
            const self = this
            self.loading = true

            const fd = new FormData()
            fd.append(`avatar`, file)
            this.$api.post(`/user/avatar/de7a6f96-0548-4d03-9431-5d1fee66e547`, fd).then((r) => {
                this.$emit(`changedAvatar`, r.data)
            }).catch((err) => {
                alert(err.message)
            })
        },
        flipX() {
            const dom = this.$refs.flipX
            let scale = dom.getAttribute(`data-scale`)
            scale = scale ? -scale : -1
            this.$refs.cropper.scaleX(scale)
            dom.setAttribute(`data-scale`, scale)
        },
        flipY() {
            const dom = this.$refs.flipY
            let scale = dom.getAttribute(`data-scale`)
            scale = scale ? -scale : -1
            this.$refs.cropper.scaleY(scale)
            dom.setAttribute(`data-scale`, scale)
        },
        getCropBoxData() {
            this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4)
        },
        getData() {
            this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4)
        },
        move(offsetX, offsetY) {
            this.$refs.cropper.move(offsetX, offsetY)
        },
        reset() {
            this.$refs.cropper.reset()
        },
        rotate(deg) {
            this.$refs.cropper.rotate(deg)
        },
        setCropBoxData() {
            if (!this.data) return
            this.$refs.cropper.setCropBoxData(JSON.parse(this.data))
        },
        setData() {
            if (!this.data) return
            this.$refs.cropper.setData(JSON.parse(this.data))
        },
        setImage(e) {
            const file = e.target.files[0]
            if (file.type.indexOf(`image/`) === -1) {
                alert(`Please select an image file`)
                return
            }
            if (typeof FileReader === `function`) {
                const reader = new FileReader()
                reader.onload = (event) => {
                    this.imgSrc = event.target.result
                    // rebuild cropperjs with the updated source
                    this.$refs.cropper.replace(event.target.result)
                }
                reader.readAsDataURL(file)
            } else {
                alert(`Sorry, FileReader API not supported`)
            }
        },
        showFileChooser() {
            this.$refs.input.click()
        },
        zoom(percent) {
            this.$refs.cropper.relativeZoom(percent)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.avatar-actioner {
  display: none;
}
.preview-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.preview-area > img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 100%;
  align-self: center
}
.actions-cropping {
  padding: 10px 0px;
}
.actions-cropping a {
  text-decoration: none;
  color: white;
  background: darkgrey;
  padding: 0.4em;
}
</style>
