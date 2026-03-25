<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 900,
  },
});

const displayValue = ref(0);
let animationFrame = 0;

function animate(from, to) {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  const start = performance.now();
  const delta = to - from;

  const step = (now) => {
    const progress = Math.min((now - start) / props.duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    displayValue.value = Math.round(from + delta * eased);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(step);
    }
  };

  animationFrame = requestAnimationFrame(step);
}

watch(
  () => props.value,
  (next, prev) => {
    animate(prev, next);
  }
);

onMounted(() => {
  displayValue.value = props.value;
});

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<template>
  <span class="counter">{{ displayValue }}</span>
</template>

<style scoped>
.counter {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  color: #8fd0ff;
}
</style>
