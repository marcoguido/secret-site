<script setup lang="ts">
import { computed, defineComponent } from 'vue'

defineComponent({
  name: 'carousel-section',
})

const carouselImages = computed(() => {
  const images = []
  for (let i = 0 ; i < 19 ; i++) {
    images.push({
      id: `img-${i}`,
      path: `/assets/img/carousel_${i + 1}.jpg`,
      alt: `Image number ${i} of the carousel`
    })
  }

  return images
})
</script>

<template>
  <section class="w-full h-48 overflow-hidden snap-start flex items-center bg-powder-blue">
    <div class="w-full flex space-x-4 animate-marquee whitespace-nowrap">
      <img
        v-for="image in carouselImages"
        :key="image.id"
        :src="image.path"
        :alt="image.alt"
        class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
      />
    </div>
  </section>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 60s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
