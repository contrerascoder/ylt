<template>
  <authed-user :url="'/'">
    <chat-window v-if="token" />
  </authed-user>
</template>

<script>
import ChatWindow from "@/components/ChatWindow"
import AuthedUser from '@/components/ui/authed-user'

export default {
    components: {AuthedUser, ChatWindow},
    mounted() {
        this.configBar(`Mensajes`, [
            {handler: this.logout, text: `Cerrar sesion`},
            {handler: this.goToProfile, text: `Ir al perfil`},
        ])
    },
    methods: {
        goToProfile() {
            this.$router.push(`/profile`)
        },
    },
    head() {
        return {
            title: `Mensajes`,
        }
    },
}
</script>
