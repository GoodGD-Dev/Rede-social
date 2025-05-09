import messageService from "@/services/message.service";

const state = {
  currentChat: {
    user: null,
    messages: []
  },
  unreadCount: 0,
  isLoading: false,
  error: null
};

const getters = {
  currentChat: state => state.currentChat,
  unreadCount: state => state.unreadCount,
  isLoading: state => state.isLoading,
  error: state => state.error,
};

const actions = {
  // Carregar mensagens com um usuário
  async loadMessages({ commit, dispatch }, userId) {
    commit("setLoading", true);
    commit("clearError");

    try {
      const response = await messageService.getMessages(userId);
      commit("setCurrentChat", {
        user: userId,
        messages: response.data.data.messages
      });
      // Atualizar contagem de mensagens não lidas
      dispatch("getUnreadCount");
      return response;
    } catch (error) {
      commit("setError", error.response?.data?.message || "Erro ao carregar mensagens");
      throw error;
    } finally {
      commit("setLoading", false);
    }
  },

  // Enviar mensagem
  async sendMessage({ commit, state }, { content }) {
    if (!state.currentChat.user) return;

    commit("setLoading", true);
    commit("clearError");

    try {
      const response = await messageService.sendMessage(
        state.currentChat.user,
        content
      );
      // Adicionar mensagem à conversa atual
      commit("addMessage", response.data.data.message);
      return response;
    } catch (error) {
      commit("setError", error.response?.data?.message || "Erro ao enviar mensagem");
      throw error;
    } finally {
      commit("setLoading", false);
    }
  },

  // Obter contagem de mensagens não lidas
  async getUnreadCount({ commit }) {
    try {
      const response = await messageService.getUnreadCount();
      commit("setUnreadCount", response.data.data.unreadCount);
      return response;
    } catch (error) {
      console.error("Erro ao buscar contagem de mensagens não lidas:", error);
    }
  },

  // Configurar chat atual
  setCurrentChatUser({ commit, dispatch }, userId) {
    commit("clearCurrentChat");
    if (userId) {
      commit("setCurrentChatUser", userId);
      dispatch("loadMessages", userId);
    }
  }
};

const mutations = {
  setCurrentChat(state, { user, messages }) {
    state.currentChat.user = user;
    state.currentChat.messages = messages;
  },

  setCurrentChatUser(state, userId) {
    state.currentChat.user = userId;
  },

  clearCurrentChat(state) {
    state.currentChat.user = null;
    state.currentChat.messages = [];
  },

  addMessage(state, message) {
    state.currentChat.messages.push(message);
  },

  setUnreadCount(state, count) {
    state.unreadCount = count;
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