import apiService from "./api.service";

const userService = {
  searchUsers(query) {
    return apiService.get(`/users/search?query=${query}`);
  },

  getContacts() {
    return apiService.get("/users/contacts");
  },

  addContact(userId) {
    return apiService.post(`/users/contacts/${userId}`);
  },

  removeContact(userId) {
    return apiService.delete(`/users/contacts/${userId}`);
  },
};

export default userService;
