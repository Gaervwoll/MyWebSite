import { createRouter, createWebHistory } from "vue-router";
import ContactsView from "./views/ContactsView.vue";
import HomeView from "./views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/contacts", name: "contacts", component: ContactsView },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

export default router;
