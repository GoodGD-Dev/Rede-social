import axios from "axios";
import store from "../store";
import router from "../router";

// Criar instância do axios com configurações padrão
const apiService = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true, // Importante para cookies HTTP
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para adicionar token em todas as requisições
apiService.interceptors.request.use(
  (config) => {
    const token = store.getters["auth/token"];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratar erro de autenticação (401)
    if (error.response && error.response.status === 401) {
      store.dispatch("auth/logout");
      router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);

export default apiService;
