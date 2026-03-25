<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 50,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
});

const emit = defineEmits(["update:modelValue"]);
const localValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (next) => {
    localValue.value = next;
  }
);

const progress = computed(() => {
  const full = props.max - props.min;
  if (full <= 0) return 0;
  return ((localValue.value - props.min) / full) * 100;
});

const stretch = computed(() => {
  const centerDist = Math.abs(progress.value - 50) / 50;
  return 1 + centerDist * 0.25;
});

function onInput(event) {
  const next = Number(event.target.value);
  localValue.value = next;
  emit("update:modelValue", next);
}
</script>

<template>
  <div class="elastic">
    <div class="elastic__value">{{ localValue }}</div>
    <div class="elastic__track-wrap" :style="{ transform: `scaleY(${stretch})` }">
      <div class="elastic__track">
        <div class="elastic__fill" :style="{ width: `${progress}%` }" />
      </div>
    </div>
    <input
      class="elastic__input"
      type="range"
      :min="min"
      :max="max"
      :value="localValue"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.elastic {
  width: 100%;
  max-width: 320px;
  position: relative;
}

.elastic__value {
  position: absolute;
  right: 0;
  top: -1.7rem;
  color: #91cafb;
  font-weight: 600;
}

.elastic__track-wrap {
  transition: transform 0.2s ease;
}

.elastic__track {
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  overflow: hidden;
}

.elastic__fill {
  height: 100%;
  background: linear-gradient(90deg, #5aaeff, #21e4ff);
}

.elastic__input {
  margin-top: 0.45rem;
  width: 100%;
}
</style>
