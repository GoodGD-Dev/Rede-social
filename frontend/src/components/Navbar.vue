<template>
  <b-navbar toggleable="md" type="light" class="bg-white shadow-sm">
    <b-container>
      <b-navbar-brand to="/" class="d-flex align-items-center">
        <i class="fas fa-comments text-primary mr-2"></i>
        <span class="font-weight-bold">SocialMsg</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto" v-if="isAuthenticated">
          <b-nav-item to="/" exact>
            <i class="fas fa-home mr-1"></i> Home
          </b-nav-item>
          <b-nav-item to="/chat">
            <i class="fas fa-comment-dots mr-1"></i> Mensagens
            <b-badge v-if="unreadCount > 0" variant="danger" pill>{{ unreadCount }}</b-badge>
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content>
              <user-avatar 
                :username="currentUser.username" 
                :profile-image="userProfileImage" 
                :size="24"
                class="mr-1"
              />
              {{ currentUser.username }}
            </template>
            <b-dropdown-item @click="logout">
              <i class="fas fa-sign-out-alt mr-1"></i> Sair
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item to="/login">
            <i class="fas fa-sign-in-alt mr-1"></i> Login
          </b-nav-item>
          <b-nav-item to="/register">
            <i class="fas fa-user-plus mr-1"></i> Cadastrar
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "AppNavbar",
  components: {
    UserAvatar
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      currentUser: "auth/currentUser",
      unreadCount: "messages/unreadCount"
    }),
    userProfileImage() {
      // Se tivermos uma imagem de perfil, usamos ela, senão retornamos vazio
      // O componente UserAvatar vai exibir as iniciais se não houver imagem
      return this.currentUser && this.currentUser.profilePicture
        ? `/uploads/${this.currentUser.profilePicture}`
        : "";
    }
  },
  methods: {
    ...mapActions({
      logoutAction: "auth/logout",
      getUnreadCount: "messages/getUnreadCount"
    }),
    async logout() {
      await this.logoutAction();
      this.$router.push("/login");
    }
  },
  mounted() {
    // Atualizar contagem de mensagens não lidas ao montar o componente
    if (this.isAuthenticated) {
      this.getUnreadCount();
      
      // Atualizar a cada 30 segundos
      this.interval = setInterval(() => {
        this.getUnreadCount();
      }, 30000);
    }
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
};
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #e5e7eb;
}
</style>