<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'logistics-section',
})

const openGoogleMaps = () => {
  window.open('https://maps.app.goo.gl/Hdm66Cy9UFjswtMC9', '_blank')
}
</script>

<template>
  <section
    class="min-h-screen w-full flex items-center justify-center p-8 snap-start"
    style="background-image: url('/assets/img/wall_2.jpg'); background-size: cover;"
  >
    <div class="relative z-10 text-center text-white p-4">
      <h2 class="allison-regular text-2xl md:text-4xl mt-4 text-shadow-md">
        Location
      </h2>
      <p class="font-body text-lg leading-relaxed">
        Siamo entusiasti di condividere con voi il giorno più bello della nostra vita
      </p>
      <p class="font-body text-lg leading-relaxed mb-8">
        Il grande giorno si terrà interamente presso il ristorante <em>Le Querce</em> di Ponzano Veneto, che ci accoglierà col suo parco. Vi aspettiamo!
      </p>

      <div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2785.463978173981!2d12.1691038!3d45.7217892!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477939f789b265d5%3A0xe086b0163e9529e7!2sRistorante%20Le%20Querce!5e0!3m2!1sit!2sit!4v1779206759546!5m2!1sit!2sit"
          width="1080"
          height="480"
          style="border:0;"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <button
        @click="openGoogleMaps"
        class="bg-mustard-yellow text-cream-background font-body text-lg mt-5 px-8 py-3 rounded-full hover:bg-mustard-yellow/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-powder-blue focus:ring-offset-2"
      >
        Apri su Google Maps
      </button>
    </div>
  </section>
</template>
