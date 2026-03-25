<script setup>
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const letters = computed(() => props.text.split(""));
</script>

<template>
  <span class="fuzzy" :aria-label="text">
    <span
      v-for="(ch, index) in letters"
      :key="`${ch}-${index}`"
      class="fuzzy__char"
      :style="{ animationDelay: `${index * 55}ms` }"
      aria-hidden="true"
    >
      {{ ch === " " ? "\u00A0" : ch }}
    </span>
  </span>
</template>

<style scoped>
.fuzzy {
  display: inline-flex;
  flex-wrap: wrap;
  color: #b9c3d0;
}

.fuzzy__char {
  display: inline-block;
  filter: blur(0);
  opacity: 0.9;
  animation: fuzzyPulse 1.6s ease-in-out infinite;
}

@keyframes fuzzyPulse {
  0%,
  100% {
    opacity: 0.6;
    filter: blur(1.4px);
  }

  50% {
    opacity: 1;
    filter: blur(0);
  }
}
</style>
