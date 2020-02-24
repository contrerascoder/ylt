<template>
  <authed-user :url="'/'">
    <img :src="user && user.refImage">
    <image-cropper @changedAvatar="updateAvatarRef" />
  </authed-user>
</template>

<script>
import ImageCropper from '@/components/ui/cropper'
import AuthedUser from '@/components/ui/authed-user'
export default {
    components: {ImageCropper, AuthedUser},
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
        },
    },
    head() {
        return {
            title: `Pagina de perfil`,
        }
    },
}
</script>
