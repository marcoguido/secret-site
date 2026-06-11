<script setup lang="ts">
import { computed, defineComponent } from 'vue'

defineComponent({
  name: 'carousel-section',
})

const carouselImages = computed(() => {
  const images = []
  for (let i = 0; i < 19; i++) {
    images.push({
      id: `img-${i}`,
      path: `/assets/img/carousel_${i + 1}.webp`,
      alt: `Image number ${i} of the carousel`,
    })
  }

  return images
})
</script>

<template>
  <section class="w-full h-48 overflow-hidden flex items-center bg-powder-blue">
    <div class="flex animate-marquee">
      <img
        v-for="image in carouselImages"
        :key="image.id"
        :src="image.path"
        :alt="image.alt"
        loading="lazy"
        decoding="async"
        class="h-40 mr-4 object-cover rounded-lg shadow-md shrink-0"
      />
      <!-- Duplicate set so the -50% marquee loops seamlessly with no blank gap -->
      <img
        v-for="image in carouselImages"
        :key="`${image.id}-clone`"
        :src="image.path"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        class="h-40 mr-4 object-cover rounded-lg shadow-md shrink-0"
      />
    </div>
  </section>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 35s linear infinite;
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
