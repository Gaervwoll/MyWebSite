import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

document.documentElement.classList.add("js");

createApp(App).use(router).mount("#app");
