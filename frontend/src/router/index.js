import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Chat from "@/views/Chat.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guestOnly: true }
  },
  {
    path: "/chat/:id?",
    name: "Chat",
    component: Chat,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;