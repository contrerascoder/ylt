<template>
  <authed-user :url="'/'">
    <img :src="user && user.refImage">
    <button @click="uploadingImage = true">
      Cambiar avatar
    </button>
    <div
      v-if="uploadingImage"
      class="modal"
    >
      <span
        class="modal__close"
        @click="uploadingImage = false"
      >
        <i class="fas fa-times" />
      </span>
      <div class="modal__content">
        <image-cropper @changedAvatar="updateAvatarRef" />
      </div>
    </div>
  </authed-user>
</template>

<script>
import ImageCropper from '@/components/ui/cropper'
import AuthedUser from '@/components/ui/authed-user'
export default {
    components: {ImageCropper, AuthedUser},
    data() {
        return {
            uploadingImage: false,
        }
    },
    computed: {
        modalCropperClasses() {
            return {
                modal: true,
                active: this.uploadingImage,
            }
        },
    },
    mounted() {
        this.configBar(`Pagina de perfil`, [
            {handler: this.logout, text: `Cerrar sesion`},
            {handler: this.goToProfile, text: `Ir al chat`},
        ])
    },
    methods: {
        logout(cb) {
            this.token=``
            this.$api.setHeader(`authorization`, ``)
            cb()
        },
        goToProfile() {
            this.$router.push(`/chat`)
        },
        updateAvatarRef(ref) {
            const user = Object.assign({}, this.user, {
                refImage: ref,
            })
            this.user = user
            this.uploadingImage = false
        },
    },
    head() {
        return {
            title: `Pagina de perfil`,
        }
    },
}
</script>
<style lang="scss">
.modal {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .75);
    transition: all 0.75ms;
    &__close {
        font-size: 1.5em;
        cursor: pointer;
        color: white;
        font-weight: bold;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    &__content {
        margin: 10px;
        background: white;
        padding: 20px;
        box-sizing: border-box;
        max-width: 400px;
        margin: 20px auto;
    }
}
</style>
