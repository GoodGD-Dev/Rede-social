<template>
  <div class="contacts-list">
    <div class="search-box mb-3">
      <b-input-group>
        <b-form-input
          v-model="searchQuery"
          placeholder="Buscar contatos..."
          @input="searchContacts"
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="primary">
            <i class="fas fa-search"></i>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>

    <div v-if="isLoading" class="text-center py-4">
      <b-spinner variant="primary"></b-spinner>
    </div>

    <div v-else-if="searchQuery && searchResults.length > 0" class="search-results mb-3">
      <h6 class="text-muted mb-2">Resultados da busca</h6>
      <div
        v-for="user in searchResults"
        :key="user._id"
        class="search-item d-flex align-items-center p-2 rounded mb-2"
      >
        <user-avatar
          :username="user.username"
          :profile-image="getProfileImage(user)"
          :size="40"
          class="mr-2"
        />
        <div class="user-info flex-grow-1">
          <div class="username font-weight-bold">{{ user.username }}</div>
          <div class="bio text-muted small">{{ user.bio || 'Sem bio' }}</div>
        </div>
        <b-button
          v-if="!isContact(user._id)"
          variant="outline-primary"
          size="sm"
          @click="addContact(user._id)"
        >
          <i class="fas fa-user-plus"></i>
        </b-button>
        <b-button
          v-else
          variant="outline-success"
          size="sm"
          disabled
        >
          <i class="fas fa-check"></i>
        </b-button>
      </div>
    </div>

    <div v-else-if="searchQuery && searchResults.length === 0" class="text-center py-3">
      <p class="text-muted">Nenhum usuário encontrado</p>
    </div>

    <div v-if="!searchQuery || searchResults.length === 0">
      <h6 class="text-muted mb-2">Meus Contatos</h6>
      <div v-if="contacts.length === 0" class="text-center py-3">
        <p class="text-muted">Você ainda não possui contatos</p>
        <p class="small">Use a busca acima para encontrar pessoas</p>
      </div>
      <div v-else class="contacts">
        <div
          v-for="contact in contacts"
          :key="contact._id"
          class="contact-item d-flex align-items-center p-2 rounded mb-2"
          :class="{ 'active': selectedContactId === contact._id }"
          @click="selectContact(contact._id)"
        >
          <user-avatar
            :username="contact.username"
            :profile-image="getProfileImage(contact)"
            :size="40"
            class="mr-2"
          />
          <div class="contact-info flex-grow-1">
            <div class="username font-weight-bold">{{ contact.username }}</div>
            <div class="bio text-muted small">{{ contact.bio || 'Sem bio' }}</div>
          </div>
          <b-dropdown right variant="link" no-caret>
            <template #button-content>
              <i class="fas fa-ellipsis-v text-muted"></i>
            </template>
            <b-dropdown-item @click.stop="removeContact(contact._id)">
              <i class="fas fa-user-minus text-danger mr-1"></i> Remover
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "ContactsList",
  components: {
    UserAvatar
  },
  props: {
    selectedContactId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      searchQuery: "",
      searchTimeout: null
    };
  },
  computed: {
    ...mapGetters({
      contacts: "contacts/contacts",
      searchResults: "contacts/searchResults",
      isLoading: "contacts/isLoading"
    })
  },
  methods: {
    ...mapActions({
      fetchContacts: "contacts/fetchContacts",
      searchUsers: "contacts/searchUsers",
      addContactAction: "contacts/addContact",
      removeContactAction: "contacts/removeContact"
    }),
    searchContacts() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.searchUsers(this.searchQuery);
      }, 300);
    },
    selectContact(contactId) {
      this.$emit("select-contact", contactId);
    },
    getProfileImage(user) {
      return user.profilePicture 
        ? `/uploads/${user.profilePicture}` 
        : "";
    },
    isContact(userId) {
      return this.contacts.some(contact => contact._id === userId);
    },
    async addContact(userId) {
      try {
        await this.addContactAction(userId);
        this.$bvToast.toast("Contato adicionado com sucesso!", {
          title: "Sucesso",
          variant: "success",
          solid: true
        });
        // Atualizar resultados da busca
        this.searchContacts();
      } catch (error) {
        this.$bvToast.toast(error.message || "Erro ao adicionar contato", {
          title: "Erro",
          variant: "danger",
          solid: true
        });
      }
    },
    async removeContact(userId) {
      try {
        await this.removeContactAction(userId);
        this.$bvToast.toast("Contato removido com sucesso!", {
          title: "Sucesso",
          variant: "success",
          solid: true
        });
        
        // Se o contato removido for o selecionado, selecionar o primeiro da lista
        if (this.selectedContactId === userId) {
          const newSelectedId = this.contacts.length > 0 ? this.contacts[0]._id : null;
          this.$emit("select-contact", newSelectedId);
        }
      } catch (error) {
        this.$bvToast.toast(error.message || "Erro ao remover contato", {
          title: "Erro",
          variant: "danger",
          solid: true
        });
      }
    }
  },
  mounted() {
    this.fetchContacts();
  }
};
</script>

<style scoped lang="scss">
.contacts-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.search-box {
  margin-bottom: 1rem;
}

.search-results {
  margin-bottom: 1.5rem;
}

.search-item, .contact-item {
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
  }
}

.contact-item {
  cursor: pointer;
  
  &.active {
    background-color: #e0e7ff;
  }
}

.contact-info, .user-info {
  overflow: hidden;
  
  .username {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  
  .bio {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 150px;
  }
}
</style>