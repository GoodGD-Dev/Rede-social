<template>
  <div class="register">
    <Navbar />

    <b-container class="py-5">
      <b-row>
        <b-col lg="5" md="8" sm="10" class="mx-auto">
          <b-card class="register-card">
            <div class="text-center mb-4">
              <h2>Cadastro</h2>
              <p class="text-muted">Crie sua conta</p>
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

            <b-form @submit.prevent="register">
              <b-form-group label="Nome de usuário" label-for="username">
                <b-form-input
                  id="username"
                  v-model="form.username"
                  required
                  placeholder="Escolha um nome de usuário"
                  :disabled="isLoading"
                ></b-form-input>
              </b-form-group>

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
                  placeholder="Escolha uma senha"
                  :disabled="isLoading"
                ></b-form-input>
                <small class="text-muted">Mínimo de 6 caracteres</small>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="isLoading"
                class="mt-4"
              >
                <b-spinner small v-if="isLoading"></b-spinner>
                <span v-else>Cadastrar</span>
              </b-button>
            </b-form>

            <div class="text-center mt-4">
              <p>
                Já tem uma conta?
                <router-link to="/login">Faça login</router-link>
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
  name: "Register",
  components: {
    Navbar,
  },
  data() {
    return {
      form: {
        username: "",
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
      registerAction: "auth/register",
    }),
    async register() {
      this.error = null;

      // Validações básicas
      if (this.form.username.length < 3) {
        this.error = "Nome de usuário deve ter pelo menos 3 caracteres";
        return;
      }

      if (this.form.password.length < 6) {
        this.error = "Senha deve ter pelo menos 6 caracteres";
        return;
      }

      try {
        await this.registerAction(this.form);
        this.$router.push("/");
      } catch (error) {
        this.error = error.response?.data?.message || "Erro ao cadastrar";
      }
    },
  },
};
</script>

<style scoped>
.register-card {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
