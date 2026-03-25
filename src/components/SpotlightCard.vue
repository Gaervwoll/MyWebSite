<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <article class="spotlight-card">
    <div class="spotlight-card__spot" aria-hidden="true" />
    <h4>{{ title }}</h4>
    <p>{{ description }}</p>
  </article>
</template>

<style scoped>
.spotlight-card {
  position: relative;
  border-radius: 16px;
  padding: 1rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.spotlight-card__spot {
  position: absolute;
  inset: -30%;
  background: radial-gradient(circle at 50% 50%, rgba(141, 218, 255, 0.25), transparent 55%);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.spotlight-card:hover .spotlight-card__spot {
  opacity: 1;
}

.spotlight-card h4 {
  position: relative;
  margin: 0 0 0.5rem;
}

.spotlight-card p {
  position: relative;
  margin: 0;
  color: #aeb9c8;
}
</style>
