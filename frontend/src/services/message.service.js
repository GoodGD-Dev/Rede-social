import apiService from "./api.service";

const messageService = {
  sendMessage(recipientId, content) {
    return apiService.post("/messages", { recipientId, content });
  },

  getMessages(userId) {
    return apiService.get(`/messages/user/${userId}`);
  },

  getUnreadCount() {
    return apiService.get("/messages/unread-count");
  },
};

export default messageService;
