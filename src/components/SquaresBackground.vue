<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const canvasRef = ref(null);
let ctx = null;
let width = 0;
let height = 0;
let animationFrame = 0;
let offset = 0;
const pointer = { x: null, y: null, active: false };

function resize() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw() {
  if (!ctx) return;
  const size = 44;
  const lineColor = "rgba(140, 180, 255, 0.14)";
  const glowColor = "rgba(100, 160, 255, 0.06)";

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#0b1019";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = glowColor;
  for (let y = -size; y < height + size; y += size) {
    for (let x = -size; x < width + size; x += size) {
      const dx = pointer.x == null ? 9999 : pointer.x - x;
      const dy = pointer.y == null ? 9999 : pointer.y - y;
      const cursorBoost = pointer.active ? Math.max(0, 1 - Math.hypot(dx, dy) / 200) * 0.35 : 0;
      const pulse = (Math.sin((x + y + offset) * 0.02) + 1) * 0.5 + cursorBoost;
      if (pulse > 0.78) {
        ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
      }
    }
  }

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;
  for (let x = (offset % size) - size; x < width + size; x += size) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = (offset % size) - size; y < height + size; y += size) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  if (pointer.active && pointer.x != null && pointer.y != null) {
    const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 180);
    gradient.addColorStop(0, "rgba(72, 177, 255, 0.23)");
    gradient.addColorStop(1, "rgba(72, 177, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 180, 0, Math.PI * 2);
    ctx.fill();
  }
}

function loop() {
  offset += pointer.active ? 0.42 : 0.28;
  draw();
  animationFrame = requestAnimationFrame(loop);
}

function onResize() {
  resize();
  draw();
}

function onPointerMove(event) {
  pointer.active = true;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
}

function onPointerLeave() {
  pointer.active = false;
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  if (!ctx) return;
  resize();
  draw();
  animationFrame = requestAnimationFrame(loop);
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("mousemove", onPointerMove, { passive: true });
  window.addEventListener("mouseleave", onPointerLeave, { passive: true });
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame);
  window.removeEventListener("resize", onResize);
  window.removeEventListener("mousemove", onPointerMove);
  window.removeEventListener("mouseleave", onPointerLeave);
});
</script>

<template>
  <canvas ref="canvasRef" class="squares-bg" aria-hidden="true" />
</template>

<style scoped>
.squares-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}
</style>
