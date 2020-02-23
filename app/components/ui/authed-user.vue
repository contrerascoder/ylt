<template>
  <div>
    <template v-if="token">
      <slot />
    </template>
    <template v-else>
      <p>Necesitas autenticarte</p>
      <redirect
        :url="url"
        :ms="ms"
      />
    </template>
  </div>
</template>

<script>
import {mapState} from "vuex"
import Redirect from './redirect'
export default {
    components: {Redirect},
    props: {
        url: {
            type: String,
            default: `/`,
        },
        ms: {
            type: Number,
            default: 2000,
        },
    },
    computed: {
        ...mapState(`auth`, [`token`]),
    },
}
</script>
