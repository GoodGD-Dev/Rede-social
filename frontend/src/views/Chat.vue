<template>
  <div class="chat-page">
    <Navbar />
    
    <div class="chat-container">
      <div class="sidebar" :class="{ 'mobile-open': showSidebar }">
        <div class="sidebar-header">
          <h5 class="mb-0">Contatos</h5>
          <b-button 
            variant="link" 
            class="close-sidebar d-md-none" 
            @click="showSidebar = false"
          >
            <i class="fas fa-times"></i>
          </b-button>
        </div>
        
        <div class="sidebar-content">
          <ContactsList 
            :selectedContactId="selectedContactId" 
            @select-contact="selectContact"
          />
        </div>
      </div>
      
      <div class="main-content">
        <div v-if="!selectedContactId" class="empty-chat">
          <EmptyChatPlaceholder @add-contact="showSidebar = true" />
        </div>
        
        <div v-else class="chat-content">
          <div class="chat-header">
            <b-button 
              variant="link" 
              class="toggle-sidebar d-md-none" 
              @click="showSidebar = true"
            >
              <i class="fas fa-bars"></i>
            </b-button>
            
            <div class="d-flex align-items-center">
              <user-avatar 
                :username="selectedContactName" 
                :profile-image="selectedContactImage" 
                :size="40"
                class="mr-2"
              />
              <h5 class="mb-0">{{ selectedContactName }}</h5>
            </div>
          </div>
          
          <div class="messages-content">
            <MessagesList :contactId="selectedContactId" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar.vue";
import ContactsList from "@/components/ContactsList.vue";
import MessagesList from "@/components/MessagesList.vue";
import EmptyChatPlaceholder from "@/components/EmptyChatPlaceholder.vue";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "ChatView",
  components: {
    Navbar,
    ContactsList,
    MessagesList,
    EmptyChatPlaceholder,
    UserAvatar
  },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      showSidebar: false,
      selectedContactId: null
    };
  },
  computed: {
    ...mapGetters({
      contacts: "contacts/contacts"
    }),
    selectedContact() {
      return this.contacts.find(contact => contact._id === this.selectedContactId) || null;
    },
    selectedContactName() {
      return this.selectedContact?.username || "";
    },
    selectedContactImage() {
      return this.selectedContact?.profilePicture 
        ? `/uploads/${this.selectedContact.profilePicture}` 
        : "";
    }
  },
  methods: {
    selectContact(contactId) {
      this.selectedContactId = contactId;
      this.showSidebar = false; // Fechar sidebar no mobile ao selecionar
      
      // Atualizar URL sem recarregar a página
      this.$router.push(`/chat/${contactId}`);
    }
  },
  created() {
    // Definir contato selecionado se vier da URL
    if (this.id) {
      this.selectedContactId = this.id;
    }
  },
  mounted() {
    // Abrir sidebar automaticamente em dispositivos móveis se não houver contato selecionado
    if (!this.selectedContactId && window.innerWidth < 768) {
      this.showSidebar = true;
    }
  }
};
</script>

<style scoped lang="scss">
.chat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 320px;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  position: relative;
}

.empty-chat {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.messages-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

// Mobile responsiveness
@media (max-width: 767.98px) {
  .sidebar {
    position: fixed;
    top: 56px; // Altura da navbar
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    
    &.mobile-open {
      transform: translateX(0);
    }
  }
  
  .toggle-sidebar {
    margin-right: 1rem;
  }
}
</style>