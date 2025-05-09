<template>
  <div class="not-found">
    <Navbar />

    <b-container class="py-5 text-center">
      <div class="not-found-content">
        <h1 class="display-1 mb-4">404</h1>
        <h2 class="mb-4">Página não encontrada</h2>
        <p class="lead mb-5">
          A página que você está procurando não existe ou foi removida.
        </p>

        <b-button variant="primary" to="/" size="lg">
          <i class="fas fa-home mr-2"></i>
          Voltar para a Home
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "PageNotFound",
  components: {
    Navbar,
  },
};
</script>
