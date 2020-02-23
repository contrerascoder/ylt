<template>
  <authed-user :url="'/'">
    <chat-window v-if="token" />
  </authed-user>
</template>

<script>
import ChatWindow from "@/components/ChatWindow"
import {mapFields} from "vuex-map-fields"
import AuthedUser from '@/components/ui/authed-user'

export default {
    components: {ChatWindow, AuthedUser},
    computed: {
        ...mapFields(`auth`, [`token`]),
    },
}
</script>
