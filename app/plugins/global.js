import Vue from 'vue'
import {mapFields} from "vuex-map-fields"
import FormField from '@/components/ui/vue-form-field'
import VueForm from '@/components/ui/vue-form'
import AuthedUser from '@/components/ui/authed-user'
import GuestUser from '@/components/ui/guest-user'
import Redirect from '@/components/ui/redirect'

Vue.component(`form-field`, FormField)
Vue.component(`vue-form`, VueForm)
Vue.component(`authed-user`, AuthedUser)
Vue.component(`guest-user`, GuestUser)
Vue.component(`redirect`, Redirect)

Vue.mixin({
    computed: {
        ...mapFields(`auth`, [`token`, `user`]),
    },
    methods: {
        configBar(title, menuButtons = []) {
            this.$store.commit(`setBar`, {title, menu: menuButtons})
        },
        logout(cb) {
            this.token=``
            this.user = ``
            this.$api.setHeader(`authorization`, ``)
            cb()
        },
    },
})

export default ({store}) => {
}
