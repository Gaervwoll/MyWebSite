<script setup>
import { nextTick, onMounted, provide, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import DockMenu from "./components/DockMenu.vue";
import SquaresBackground from "./components/SquaresBackground.vue";

const router = useRouter();
const route = useRoute();

const photoVisible = ref(false);
const totalLikes = ref(0);
const likesLoaded = ref(true);

const menuItems = [
  { label: "Главная", route: "/", hash: "#hero", icon: "🏠" },
  { label: "Стек", route: "/", hash: "#stack", icon: "🧩" },
  { label: "Навыки", route: "/", hash: "#skills", icon: "🧠" },
  { label: "Работы", route: "/", hash: "#works", icon: "💼" },
  { label: "Фото", action: "toggle-photo", icon: "🖼️" },
  { label: "Контакты", route: "/contacts", icon: "✉️" },
];

function getLikes() {
  const raw = window.localStorage.getItem("site-total-likes");
  return raw ? Number(raw) : 0;
}

function setLikes(value) {
  window.localStorage.setItem("site-total-likes", String(value));
}

async function submitFeedback(answer) {
  likesLoaded.value = false;
  await new Promise((resolve) => setTimeout(resolve, 700));
  const next = getLikes() + 1;
  setLikes(next);
  totalLikes.value = next;
  likesLoaded.value = true;
  if (answer && answer !== "Да") {
    console.info("Feedback:", answer);
  }
}

async function onDockSelect(item) {
  if (item.action === "toggle-photo") {
    photoVisible.value = !photoVisible.value;
    if (route.path !== "/") {
      await router.push("/");
    }
    return;
  }

  if (item.route && route.path !== item.route) {
    await router.push(item.route);
  }

  if (item.hash) {
    await nextTick();
    const target = document.querySelector(item.hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

provide("photoVisible", photoVisible);
provide("totalLikes", totalLikes);
provide("likesLoaded", likesLoaded);
provide("submitFeedback", submitFeedback);

onMounted(() => {
  totalLikes.value = getLikes();
});
</script>

<template>
  <SquaresBackground />
  <DockMenu :items="menuItems" :magnification="50" @select="onDockSelect" />
  <div class="page-layer">
    <RouterView />
  </div>
</template>
