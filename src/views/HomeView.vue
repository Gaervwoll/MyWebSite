<script setup>
import { inject, onMounted, ref } from "vue";
import CardNav from "../components/CardNav.vue";
import ElasticSlider from "../components/ElasticSlider.vue";
import FuzzyText from "../components/FuzzyText.vue";
import ShapeBlurPhoto from "../components/ShapeBlurPhoto.vue";
import SpotlightCard from "../components/SpotlightCard.vue";
import StarBorderButton from "../components/StarBorderButton.vue";

const photoVisible = inject("photoVisible");

const stack = [
  { title: "Frontend", description: "Vue 3, JavaScript, Vite, responsive UI" },
  { title: "Backend", description: "Django, REST API, базовая интеграция данных" },
  { title: "DevOps", description: "Docker, docker-compose, Nginx" },
];

const skills = ref([]);
const works = ref([]);
const loading = ref(true);
const skillLevel = ref(72);

function mockFetchPortfolio() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        skills: [
          { title: "Vue 3", description: "SPA, Composition API, работа с компонентами" },
          { title: "UI/UX", description: "Прототипы, микровзаимодействия, анимации" },
          { title: "Docker", description: "Сборка и деплой фронтенда в контейнере" },
        ],
        works: [
          { title: "Portfolio V2", description: "Редизайн и улучшение производительности" },
          { title: "Landing Pro", description: "Конверсионный лендинг для продукта" },
          { title: "Admin Panel", description: "Интерфейс управления с аналитикой" },
        ],
      });
    }, 1200);
  });
}

onMounted(async () => {
  const data = await mockFetchPortfolio();
  skills.value = data.skills;
  works.value = data.works;
  loading.value = false;
});
</script>

<template>
  <main id="hero" class="hero">
    <section class="hero__content layer-card">
      <h1 class="hero__title">Привет! Я - Олег</h1>
      <p class="hero__subtitle">Vue.js developer. Делаю понятные и живые интерфейсы.</p>

      <Transition name="photo-pop">
        <ShapeBlurPhoto
          v-if="photoVisible"
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
          alt="Портрет"
        />
      </Transition>

      <div class="hero__button">
        <StarBorderButton label="Рабочая кнопка" />
      </div>
    </section>
  </main>

  <section id="stack" class="section">
    <div class="section__panel layer-panel">
      <h2>Стек</h2>
      <CardNav title="Технологический стек" :items="stack" />
    </div>
  </section>

  <section id="skills" class="section">
    <div class="section__panel layer-panel">
      <h2>Навыки</h2>
      <p class="section__helper">Elastic Slider</p>
      <ElasticSlider v-model="skillLevel" :min="0" :max="100" />
      <p class="section__hint">Текущий уровень: {{ skillLevel }}%</p>

      <div v-if="loading" class="loading-line">
        <FuzzyText text="Загружаю навыки..." />
      </div>
      <CardNav v-else title="Стек и навыки" :items="skills" />
    </div>
  </section>

  <section id="works" class="section">
    <div class="section__panel layer-panel">
      <h2>Работы</h2>
      <div v-if="loading" class="loading-line">
        <FuzzyText text="Загружаю проекты..." />
      </div>
      <div v-else class="works-grid">
        <SpotlightCard
          v-for="work in works"
          :key="work.title"
          :title="work.title"
          :description="work.description"
        />
      </div>
    </div>
  </section>
</template>
