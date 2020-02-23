import Vue from 'vue'

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
    methods: {
        configBar(title, menuButtons) {
            this.$store.commit(`setBar`, {title, menu: menuButtons})
        },
    },
})

export default ({store}) => {
}
