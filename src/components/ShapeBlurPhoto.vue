<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "Photo",
  },
});
</script>

<template>
  <div class="photo">
    <div class="photo__shape photo__shape--one" />
    <div class="photo__shape photo__shape--two" />
    <img :src="src" :alt="alt" class="photo__img" />
  </div>
</template>

<style scoped>
.photo {
  position: relative;
  width: 250px;
  aspect-ratio: 4/5;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.photo__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.photo__shape {
  position: absolute;
  border-radius: 999px;
  filter: blur(38px);
  z-index: 1;
}

.photo__shape--one {
  width: 180px;
  height: 180px;
  left: -50px;
  top: -30px;
  background: rgba(102, 162, 255, 0.55);
}

.photo__shape--two {
  width: 190px;
  height: 190px;
  right: -40px;
  bottom: -20px;
  background: rgba(0, 218, 255, 0.45);
}
</style>
