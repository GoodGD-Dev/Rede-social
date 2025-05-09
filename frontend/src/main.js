// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue3 } from "bootstrap-vue-3";

// Importar CSS do Bootstrap e BootstrapVue
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "@fortawesome/fontawesome-free/css/all.css";

// Importar CSS personalizado
import "./assets/styles/main.scss";

const app = createApp(App);

// Usar plugins
app.use(BootstrapVue3);
app.use(store);
app.use(router);

// Interceptar navegação para verificar autenticação
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: "Login" });
  } else if (to.matched.some(record => record.meta.guestOnly) && isAuthenticated) {
    next({ name: "Home" });
  } else {
    next();
  }
});

app.mount("#app");