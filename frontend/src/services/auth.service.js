import apiService from "./api.service";

const authService = {
  register(userData) {
    return apiService.post("/auth/register", userData);
  },

  login(credentials) {
    return apiService.post("/auth/login", credentials);
  },

  logout() {
    return apiService.get("/auth/logout");
  },

  getCurrentUser() {
    return apiService.get("/auth/me");
  },
};

export default authService;
