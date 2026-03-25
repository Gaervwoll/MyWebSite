<script setup>
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  magnification: {
    type: Number,
    default: 50,
  },
});
const emit = defineEmits(["select"]);

const mouseY = ref(Number.POSITIVE_INFINITY);
const isInside = ref(false);
const itemRefs = ref([]);

function handleMove(event) {
  mouseY.value = event.clientY;
  isInside.value = true;
}

function handleLeave() {
  mouseY.value = Number.POSITIVE_INFINITY;
  isInside.value = false;
}

function setItemRef(el, index) {
  if (el) {
    itemRefs.value[index] = el;
  }
}

function scaleFor(index) {
  const el = itemRefs.value[index];
  if (!el || !Number.isFinite(mouseY.value)) return 1;
  const rect = el.getBoundingClientRect();
  const center = rect.top + rect.height / 2;
  const dist = Math.abs(mouseY.value - center);
  const maxDist = 150;
  const ratio = Math.max(0, 1 - dist / maxDist);
  return 1 + (props.magnification / 100) * ratio;
}

function onClick(item) {
  emit("select", item);
}
</script>

<template>
  <nav class="dock" @mousemove="handleMove" @mouseleave="handleLeave">
    <button
      v-for="(item, idx) in items"
      :key="item.label"
      :ref="(el) => setItemRef(el, idx)"
      type="button"
      class="dock__item"
      :title="item.label"
      :aria-label="item.label"
      :style="{ transform: `scale(${scaleFor(idx)})` }"
      @click="onClick(item)"
    >
      <span class="dock__icon">{{ item.icon }}</span>
      <span class="dock__label" :class="{ 'dock__label--visible': isInside }">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.dock {
  position: fixed;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: grid;
  gap: 0.7rem;
  padding: 0.75rem 0.6rem;
  border-radius: 999px;
  background: rgba(10, 14, 23, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.dock__item {
  position: relative;
  border: none;
  width: 50px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  text-decoration: none;
  color: #e8edf2;
  background: rgba(255, 255, 255, 0.04);
  transition: transform 0.12s ease;
  cursor: pointer;
}

.dock__icon {
  font-size: 1.05rem;
}

.dock__label {
  position: absolute;
  left: 58px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s ease;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.72);
  font-size: 12px;
  white-space: nowrap;
}

.dock__item:hover .dock__label,
.dock__label--visible {
  opacity: 1;
}
</style>
