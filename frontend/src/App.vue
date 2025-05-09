<template>
  <div id="app">
    <div class="app-container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // Verificar se o usuário está logado ao iniciar
    this.$store.dispatch('auth/checkAuth');
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  color: #2c3e50;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .app-container {
    padding: 0;
  }
}
</style>