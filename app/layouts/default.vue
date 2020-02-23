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
        Sin tituloo
        <a
          v-if="token"
          id="menu-open"
          class="header__nav-open"
          href="#"
          @click="token=''"
        ><i class="fas fa-bars" /></a>
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
        ><i class="fas fa-times-circle" /></a><a
          class="header__link active"
          href="/home"
        >Home</a><a
          class="header__link"
          href="/contact"
        >Contact</a><a
          class="header__link"
          href="/about"
        >About</a>
      </nav>
    </header>
    <main class="main-container">
      <nuxt />
    </main>
  </div>
</template>

<script>
import {mapFields} from "vuex-map-fields"
export default {
    data() {
        return {
            showingMenu: false,
        }
    },
    computed: {
        ...mapFields(`auth`, [`token`]),
        menuClasses() {
            return {
                header__right: true,
                active: this.showingMenu,
            }
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/style.scss';
</style>
