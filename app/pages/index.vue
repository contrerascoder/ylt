<template>
  <guest-user :url="'/chat'">
    <div class="card">
      <template v-if="signining">
        <h2>Accede al chat</h2><form-login /><div class="flex-centered">
          <a
            class="button clear"
            @click="signining = false"
          >Registrarse</a>
        </div>
      </template>
      <template v-else>
        <h2>Registrate</h2><form-register @registered="signining = true" /><div class="flex-centered">
          <a
            class="button clear"
            @click="signining = true"
          >Acceder</a>
        </div>
      </template>
    </div>
  </guest-user>
</template>
<script>
import FormLogin from "@/components/FormLogin"
import FormRegister from "@/components/FormRegister"

export default {
    components: {FormLogin, FormRegister},
    data() {
        return {
            name: `raul`,
            signining: true,
        }
    },
    mounted() {
        this.configBar(`Bienvenido`, [
            {handler: this.logout, text: `Cerrar sesion`},
        ])
    },
    head() {
        return {
            title: `Bienvenido`,
        }
    },
}
</script>
