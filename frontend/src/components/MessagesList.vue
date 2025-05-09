<template>
  <div class="messages-list">
    <div class="messages-container" ref="messagesContainer">
      <div v-if="isLoading" class="text-center py-4">
        <b-spinner variant="primary"></b-spinner>
      </div>

      <div v-else-if="messages.length === 0" class="text-center py-4">
        <p class="text-muted">Nenhuma mensagem ainda</p>
        <p class="small">Envie a primeira mensagem abaixo</p>
      </div>

      <div v-else class="messages py-3">
        <div
          v-for="(message, index) in messages"
          :key="message._id"
          class="message-item"
        >
          <!-- Data do dia (mostrar apenas uma vez por dia) -->
          <div
            v-if="shouldShowDate(message, index)"
            class="message-date text-center my-3"
          >
            <span class="badge badge-light py-1 px-2">
              {{ formatMessageDate(message.createdAt) }}
            </span>
          </div>

          <div
            class="message-bubble"
            :class="{
              outgoing: message.sender._id === currentUser._id,
              incoming: message.sender._id !== currentUser._id,
            }"
          >
            {{ message.content }}
            <div class="message-time small">
              {{ formatMessageTime(message.createdAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="message-input mt-3">
      <b-form @submit.prevent="sendMessage">
        <b-input-group>
          <b-form-textarea
            v-model="newMessage"
            placeholder="Digite sua mensagem..."
            rows="1"
            max-rows="5"
            @keydown.enter.prevent="handleEnterKey"
            :disabled="isLoading"
          ></b-form-textarea>
          <b-input-group-append>
            <b-button
              variant="primary"
              type="submit"
              :disabled="!newMessage.trim() || isLoading"
            >
              <i class="fas fa-paper-plane"></i>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MessagesList",
  props: {
    contactId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newMessage: "",
    };
  },
  computed: {
    ...mapGetters({
      currentChat: "messages/currentChat",
      isLoading: "messages/isLoading",
      currentUser: "auth/currentUser",
    }),
    messages() {
      return this.currentChat.messages || [];
    },
  },
  watch: {
    contactId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.setCurrentChatUser(newVal);
        }
      },
    },
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
  methods: {
    ...mapActions({
      setCurrentChatUser: "messages/setCurrentChatUser",
      sendMessageAction: "messages/sendMessage",
    }),
    formatMessageDate(date) {
      const messageDate = new Date(date);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (messageDate.toDateString() === today.toDateString()) {
        return "Hoje";
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        return "Ontem";
      } else {
        return messageDate.toLocaleDateString("pt-BR");
      }
    },
    formatMessageTime(date) {
      const messageDate = new Date(date);
      return messageDate.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    shouldShowDate(message, index) {
      if (index === 0) return true;

      const currentDate = new Date(message.createdAt).toDateString();
      const prevDate = new Date(
        this.messages[index - 1].createdAt
      ).toDateString();

      return currentDate !== prevDate;
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      try {
        await this.sendMessageAction({ content: this.newMessage.trim() });
        this.newMessage = "";
      } catch (error) {
        this.$bvToast.toast(error.message || "Erro ao enviar mensagem", {
          title: "Erro",
          variant: "danger",
          solid: true,
        });
      }
    },
    handleEnterKey(e) {
      if (e.shiftKey) return; // Permitir nova linha com Shift+Enter
      this.sendMessage();
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>

<style scoped lang="scss">
.messages-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.message-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.message-bubble {
  position: relative;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  max-width: 75%;
  word-break: break-word;

  &.outgoing {
    align-self: flex-end;
    background-color: #4f46e5;
    color: white;
    border-bottom-right-radius: 0.25rem;

    .message-time {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  &.incoming {
    align-self: flex-start;
    background-color: #e5e7eb;
    color: #111827;
    border-bottom-left-radius: 0.25rem;

    .message-time {
      color: rgba(0, 0, 0, 0.5);
    }
  }
}

.message-time {
  text-align: right;
  font-size: 0.7rem;
  margin-top: 0.25rem;
}

.message-date {
  margin: 1rem 0;

  .badge {
    background-color: #f3f4f6;
    color: #6b7280;
    font-weight: 500;
  }
}

.message-input {
  padding: 0.5rem;
  background-color: white;
  border-top: 1px solid #e5e7eb;

  .form-control {
    resize: none;
  }
}
</style>
