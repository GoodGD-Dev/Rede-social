import authService from '@/services/auth.service';

const state = {
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null
};

const getters = {
  isAuthenticated: state => !!state.token && !!state.user,
  currentUser: state => state.user,
  token: state => state.token,
  isLoading: state => state.isLoading,
  error: state => state.error
};

const actions = {
  // Registrar usuário
  async register({ commit }, userData) {
    commit('setLoading', true);
    commit('clearError');

    try {
      const response = await authService.register(userData);
      commit('setToken', response.data.token);
      commit('setUser', response.data.data.user);
      return response;
    } catch (error) {
      commit('setError', error.response?.data?.message || 'Erro ao registrar');
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  // Login de usuário
  async login({ commit }, credentials) {
    commit('setLoading', true);
    commit('clearError');

    try {
      const response = await authService.login(credentials);
      commit('setToken', response.data.token);
      commit('setUser', response.data.data.user);
      return response;
    } catch (error) {
      commit('setError', error.response?.data?.message || 'Erro ao fazer login');
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  // Logout
  async logout({ commit }) {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      commit('clearAuth');
    }
  },

  // Verificar se o usuário está autenticado
  async checkAuth({ commit, state }) {
    if (!state.token) return;

    commit('setLoading', true);

    try {
      const response = await authService.getCurrentUser();
      commit('setUser', response.data.data.user);
    } catch (error) {
      commit('clearAuth');
    } finally {
      commit('setLoading', false);
    }
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  setToken(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },

  clearAuth(state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem('token');
  },

  setLoading(state, status) {
    state.isLoading = status;
  },

  setError(state, error) {
    state.error = error;
  },

  clearError(state) {
    state.error = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
