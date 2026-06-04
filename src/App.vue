<script setup lang="ts">
import Hero from './sections/Hero.vue'
import Timeline from './sections/Timeline.vue'
import Carousel from './sections/Carousel.vue'
</script>

<template>
  <div
    class="min-h-screen bg-cream-background text-powder-blue snap-y snap-mandatory"
  >
    <hero />

    <timeline />

    <carousel />

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
