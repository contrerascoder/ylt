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
* {box-sizing: border-box;}
body {
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
}
h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    font-family: 'Slabo 27px', serif;
}
input[type="text"], textarea {
    font-family: 'Space Mono', monospace;
}
.main-container {
    margin: 10px 10px;
    margin-top: 10px;
    max-width: 1024px;
    @media screen and (min-width: 768px) {
        margin: 10px auto;
    }
}

.button {
    padding: 0.3em 0.5em;
    font-weight: bold;
    border: none;
    cursor: pointer;
    &:not(.clear) {color: white;}
    &.success {background: steelblue;}
    &.danger {background: tomato;}
    &.warn {background: orange;}
}
.buttons {
    .button:not(:last-child) {
        margin-right: 10px;
    }
}
.flex-centered {
    display: flex;
    justify-content: center;
    padding: 1em;
}
.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 10px;
}
.header {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    align-items: center;
    background-color: #f1f1f1;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    &__right {
        display: flex;
        align-items: center;
        flex-direction: column;
        @media screen and (max-width: 425px) {
            z-index: 500000;
            position: absolute;
            top: -100vh;
            right: 0px;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.75);
            padding-top: 40px;
            transition: all .5s;
        }
        @media screen and (min-width: 768px) {
            position: static;
            flex-direction: row-reverse;
        }
        &.active {
            top: 0vh;
        }
    }
    &__link {
        @media screen and (max-width: 425px) {
            color: white;
            font-size: 1.5em;
        }
        color: black;
        font-size: 1.3em;
        font-weight: bold;
        display: inline-block;
        padding: 5px;
        margin: 2px 0px;
        text-decoration: none;
    }
    &__title {
        display: flex;
        align-items: center;
        font-size: 1.4em;
        & > a {
            font-size: 1.6em;
        color: black;
        text-decoration: none;
        }
    }
    &__nav {
        &-open {
            margin-right: 10px;
        }
        &-close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.4em;
            color: white;
        }
        &-open, &-close {
            @media screen and (min-width: 768px) {
                display: none;
            }
        }
    }
}
</style>
