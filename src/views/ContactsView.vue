<script setup>
import { inject } from "vue";
import CounterNumber from "../components/CounterNumber.vue";
import FuzzyText from "../components/FuzzyText.vue";
import StepperFeedback from "../components/StepperFeedback.vue";

const totalLikes = inject("totalLikes");
const likesLoaded = inject("likesLoaded");
const submitFeedback = inject("submitFeedback");
</script>

<template>
  <main class="contacts-page">
    <section class="section">
      <div class="section__panel layer-panel">
        <h1 class="contacts-page__title">Контакты</h1>
        <p class="contacts-page__text">Отдельная рабочая страница контактов.</p>
        <ul class="contacts-list" role="list">
          <li>
            <a href="mailto:you@example.com">you@example.com</a>
          </li>
          <li>
            <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer">
              github.com/yourname
            </a>
          </li>
          <li>
            <a href="https://t.me/yourname" target="_blank" rel="noopener noreferrer">
              t.me/yourname
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section__panel layer-panel">
        <h2>Тебе нравится?</h2>
        <StepperFeedback @complete="submitFeedback" />
        <p class="likes">
          Всего нажатий:
          <FuzzyText v-if="!likesLoaded" text="загрузка..." />
          <CounterNumber v-else :value="totalLikes" />
        </p>
      </div>
    </section>
  </main>
</template>
