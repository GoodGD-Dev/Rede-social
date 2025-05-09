import userService from '@/services/user.service';

const state = {
  contacts: [],
  searchResults: [],
  isLoading: false,
  error: null
};

const getters = {
  contacts: state => state.contacts,
  searchResults: state => state.searchResults,
  isLoading: state => state.isLoading,
  error: state => state.error
};

const actions = {
  // Buscar contatos do usuário
  async fetchContacts({ commit }) {
    commit('setLoading', true);
    commit('clearError');

    try {
      const response = await userService.getContacts();
      commit('setContacts', response.data.data.contacts);
      return response;
    } catch (error) {
      commit('setError', error.response?.data?.message || 'Erro ao buscar contatos');
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  // Buscar usuários
  async searchUsers({ commit }, query) {
    if (!query || query.length < 2) {
      commit('setSearchResults', []);
      return;
    }

    commit('setLoading', true);
    commit('clearError');

    try {
      const response = await userService.searchUsers(query);
      commit('setSearchResults', response.data.data.users);
      return response;
    } catch (error) {
      commit('setError', error.response?.data?.message || 'Erro ao buscar usuários');
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  // Adicionar contato
  async addContact({ commit, dispatch }, userId) {
    commit('setLoading', true);
    commit('clearError');

    try {
      await userService.addContact(userId);
      // Atualizar lista de contatos
      dispatch('fetchContacts');
    } catch (error) {
      commit('setError', error.response?.data?.message || 'Erro ao adicionar contato');
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  // Remover contato
  async removeContact({ commit, dispatch }, userId) {
    commit('setLoading', true);
    commit('clearError');

    try {
      await userService.removeContact(userId);
      // Atualizar lista de contatos
      dispatch('fetchContacts');
    } catch (error) {
      commit('setError', error.response?.data?.message || 'Erro ao remover contato');
      throw error;
    } finally {
      commit('setLoading', false);
    }
  }
};

const mutations = {
  setContacts(state, contacts) {
    state.contacts = contacts;
  },

  setSearchResults(state, results) {
    state.searchResults = results;
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