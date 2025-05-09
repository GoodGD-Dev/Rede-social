<template>
  <div class="user-avatar" :style="avatarStyle">
    <span v-if="!profileImage" class="avatar-initials">
      {{ initials }}
    </span>
    <img v-else :src="profileImage" :alt="username" />
  </div>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    username: {
      type: String,
      default: ""
    },
    profileImage: {
      type: String,
      default: ""
    },
    size: {
      type: Number,
      default: 40
    },
    bgColor: {
      type: String,
      default: "#4f46e5" // Cor primária do tema
    }
  },
  computed: {
    initials() {
      if (!this.username) return "";
      
      // Extrair iniciais do nome de usuário
      const words = this.username.split(/\s+/).filter(word => word.length > 0);
      
      if (words.length === 0) return "";
      if (words.length === 1) return words[0].charAt(0).toUpperCase();
      
      // Se tivermos mais de uma palavra, pegamos a primeira letra da primeira e da última
      return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    },
    avatarStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        backgroundColor: !this.profileImage ? this.bgColor : "transparent",
        fontSize: `${this.size / 2}px`
      };
    }
  }
};
</script>

<style scoped>
.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  color: white;
  font-weight: bold;
}

.avatar-initials {
  text-transform: uppercase;
  line-height: 1;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>