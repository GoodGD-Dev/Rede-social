import { createStore } from "vuex";
import auth from "./modules/auth.module";
import contacts from "./modules/contacts.module";
import messages from "./modules/messages.module";

export default createStore({
  modules: {
    auth,
    contacts,
    messages
  }
});