<template>
  <div>
    <header class="header">
      <h1 class="header__title">
        <a
          id="menu-open"
          class="header__nav-open"
          href="#"
          @click="showingMenu=true"
        ><i class="fas fa-bars" /></a><a
          class="logo"
          href="#"
        />
        {{ title }}
      </h1>
      <nav
        id="menu"
        :class="menuClasses"
      >
        <a
          id="menu-close"
          class="header__nav-close"
          href="#"
          @click="showingMenu=false"
        ><i class="fas fa-times-circle" /></a>
        <a
          v-for="(button, index) in menu"
          id="menu-close"
          :key="index"
          class="header__link"
          href="#"
          @click="() => button.handler(() => showingMenu = false)"
        >{{ button.text }}</a>
      </nav>
    </header>
    <main class="main-container">
      <nuxt />
    </main>
  </div>
</template>

<script>
import {mapState} from "vuex"
import {mapFields} from "vuex-map-fields"
export default {
    data() {
        return {
            showingMenu: false,
        }
    },
    computed: {
        ...mapState([`title`, `menu`]),
        ...mapFields(`auth`, [`token`]),
        menuClasses() {
            return {
                header__right: true,
                active: this.showingMenu,
            }
        },
    },
    methods: {
        logout() {
            this.token=``
            this.$api.setHeader(`authorization`, ``)
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/style.scss';
</style>
