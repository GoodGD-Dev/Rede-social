<template>
  <div class="empty-chat-placeholder">
    <div class="text-center">
      <i class="fas fa-comments text-muted mb-3" style="font-size: 4rem"></i>
      <h5>Bem-vindo ao seu chat</h5>
      <p class="text-muted">
        Selecione um contato ou adicione um novo para começar a conversar
      </p>
      <b-button variant="primary" @click="$emit('add-contact')">
        <i class="fas fa-user-plus mr-1"></i> Adicionar Contato
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyChatPlaceholder",
};
</script>

<style scoped>
.empty-chat-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
}
</style>
