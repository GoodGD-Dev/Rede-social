<template>
  <div class="home">
    <Navbar />

    <b-container class="py-5">
      <b-row>
        <b-col lg="8" md="10" class="mx-auto">
          <b-card class="welcome-card">
            <div class="text-center">
              <h2 class="mb-4">Bem-vindo ao SocialMsg!</h2>
              <p class="lead mb-4">
                Uma rede social simples para troca de mensagens.
              </p>

              <img
                src="@/assets/home-illustration.svg"
                alt="Home Illustration"
                class="img-fluid mb-4"
                style="max-height: 300px"
              />

              <div class="d-flex justify-content-center">
                <b-button variant="primary" to="/chat" size="lg" class="mr-3">
                  <i class="fas fa-comment-dots mr-2"></i>
                  Ir para o Chat
                </b-button>
              </div>
            </div>
          </b-card>

          <b-card class="mt-4 features-card">
            <h4 class="mb-3">Funcionalidades:</h4>
            <b-list-group>
              <b-list-group-item>
                <i class="fas fa-user-plus text-primary mr-2"></i>
                Adicione contatos
              </b-list-group-item>
              <b-list-group-item>
                <i class="fas fa-comment text-primary mr-2"></i>
                Envie mensagens de texto
              </b-list-group-item>
              <b-list-group-item>
                <i class="fas fa-bell text-primary mr-2"></i>
                Receba notificações
              </b-list-group-item>
              <b-list-group-item>
                <i class="fas fa-mobile-alt text-primary mr-2"></i>
                Interface responsiva
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.welcome-card {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.features-card {
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
