<script setup lang="ts">
import Hero from './sections/Hero.vue'
import Carousel from './sections/Carousel.vue'
import Gifts from './sections/Gifts.vue'
</script>

<template>
  <div
    class="min-h-screen bg-cream-background text-powder-blue snap-y snap-mandatory overflow-y-scroll"
  >
    <hero />

    <carousel />

    <gifts />
  </div>
</template>

<style scoped>
.snap-y.snap-mandatory {
  scroll-snap-type: y mandatory;
}

.snap-start {
  scroll-snap-align: start;
}
</style>
