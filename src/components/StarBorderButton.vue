<script setup>
defineProps({
  label: {
    type: String,
    default: "Открыть",
  },
});
</script>

<template>
  <button class="star-btn" type="button">
    <span class="star-btn__stars" aria-hidden="true" />
    <span class="star-btn__text">{{ label }}</span>
  </button>
</template>

<style scoped>
.star-btn {
  position: relative;
  border: none;
  padding: 0.9rem 1.4rem;
  border-radius: 12px;
  color: #e8edf2;
  background: rgba(12, 18, 30, 0.72);
  cursor: pointer;
  overflow: hidden;
  min-width: 180px;
}

.star-btn__stars {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid transparent;
  background:
    radial-gradient(circle at 15% 30%, rgba(255, 255, 255, 0.9) 0 2px, transparent 2px),
    radial-gradient(circle at 85% 70%, rgba(255, 255, 255, 0.8) 0 2px, transparent 2px),
    linear-gradient(120deg, #3ab6ff, #7c7eff, #48f8d9, #3ab6ff);
  background-size: auto, auto, 260% 260%;
  animation: starShift 4.8s linear infinite;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1.5px;
}

.star-btn__text {
  position: relative;
  z-index: 1;
  font-weight: 600;
}

@keyframes starShift {
  0% {
    background-position: center, center, 0% 50%;
  }
  100% {
    background-position: center, center, 100% 50%;
  }
}
</style>
