<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="card-nav">
    <h3 class="card-nav__title">{{ title }}</h3>
    <div class="card-nav__grid">
      <article v-for="item in items" :key="item.title" class="card-nav__card">
        <h4>{{ item.title }}</h4>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.card-nav {
  width: 100%;
}

.card-nav__title {
  margin: 0 0 0.9rem;
  font-size: 1.25rem;
}

.card-nav__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
}

.card-nav__card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card-nav__card:hover {
  transform: translateY(-2px);
  border-color: rgba(110, 168, 254, 0.5);
}

.card-nav__card h4 {
  margin: 0 0 0.45rem;
}

.card-nav__card p {
  margin: 0;
  color: #aab7c7;
}
</style>
