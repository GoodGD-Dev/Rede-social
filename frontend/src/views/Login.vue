<template>
  <div class="login">
    <Navbar />

    <b-container class="py-5">
      <b-row>
        <b-col lg="5" md="8" sm="10" class="mx-auto">
          <b-card class="login-card">
            <div class="text-center mb-4">
              <h2>Login</h2>
              <p class="text-muted">Entre na sua conta</p>
            </div>

            <b-alert
              v-if="error"
              show
              variant="danger"
              dismissible
              @dismissed="error = null"
            >
              {{ error }}
            </b-alert>

            <b-form @submit.prevent="login">
              <b-form-group label="Email" label-for="email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Seu email"
                  :disabled="isLoading"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Senha" label-for="password">
                <b-form-input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Sua senha"
                  :disabled="isLoading"
                ></b-form-input>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="isLoading"
                class="mt-4"
              >
                <b-spinner small v-if="isLoading"></b-spinner>
                <span v-else>Entrar</span>
              </b-button>
            </b-form>

            <div class="text-center mt-4">
              <p>
                Não tem uma conta?
                <router-link to="/register">Cadastre-se</router-link>
              </p>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "auth/isLoading",
      authError: "auth/error",
    }),
  },
  methods: {
    ...mapActions({
      loginAction: "auth/login",
    }),
    async login() {
      this.error = null;

      try {
        await this.loginAction(this.form);
        this.$router.push("/");
      } catch (error) {
        this.error = error.response?.data?.message || "Erro ao fazer login";
      }
    },
  },
};
</script>

<style scoped>
.login-card {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
