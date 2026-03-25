<script setup>
import { ref } from "vue";

const emit = defineEmits(["complete"]);

const step = ref(1);
const answer = ref("");

function next() {
  if (step.value < 3) {
    step.value += 1;
  } else {
    emit("complete", answer.value);
  }
}

function prev() {
  if (step.value > 1) {
    step.value -= 1;
  }
}

function choose(value) {
  answer.value = value;
}
</script>

<template>
  <section class="stepper">
    <div class="stepper__head">
      <div
        v-for="n in 3"
        :key="n"
        class="stepper__dot"
        :class="{ 'stepper__dot--active': n <= step }"
      />
    </div>

    <div v-if="step === 1" class="stepper__content">
      <h3>Тебе нравится сайт?</h3>
      <p>Выбери вариант, а затем нажми кнопку далее.</p>
      <div class="stepper__actions">
        <button type="button" @click="choose('Да')" :class="{ active: answer === 'Да' }">Да</button>
        <button type="button" @click="choose('Есть что улучшить')" :class="{ active: answer === 'Есть что улучшить' }">
          Есть что улучшить
        </button>
      </div>
    </div>

    <div v-else-if="step === 2" class="stepper__content">
      <h3>Спасибо за фидбек</h3>
      <p>Твой ответ: <strong>{{ answer || "не выбран" }}</strong></p>
    </div>

    <div v-else class="stepper__content">
      <h3>Отправить и показать счетчик?</h3>
      <p>После отправки загрузится общее количество нажатий.</p>
    </div>

    <div class="stepper__footer">
      <button type="button" @click="prev" :disabled="step === 1">Назад</button>
      <button type="button" @click="next">{{ step === 3 ? "Готово" : "Далее" }}</button>
    </div>
  </section>
</template>

<style scoped>
.stepper {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1rem;
  background: rgba(13, 17, 28, 0.6);
}

.stepper__head {
  display: flex;
  gap: 0.45rem;
  margin-bottom: 0.8rem;
}

.stepper__dot {
  width: 18px;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
}

.stepper__dot--active {
  background: #47e276;
}

.stepper__content h3 {
  margin: 0 0 0.45rem;
}

.stepper__content p {
  margin: 0 0 0.75rem;
  color: #b2bdca;
}

.stepper__actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.stepper button {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: #edf2f8;
  cursor: pointer;
  padding: 0.5rem 0.8rem;
}

.stepper button.active {
  border-color: rgba(71, 226, 118, 0.8);
}

.stepper__footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>
