<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'logistics-section',
})
</script>

<template>
  <section
    class="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 snap-start bg-cream-background"
  >
    <h2 class="allison-regular text-4xl md:text-6xl text-center mb-2">Location</h2>
    <p class="font-body text-center text-base md:text-lg leading-relaxed mb-8 max-w-xl">
      Siamo entusiasti di condividere con voi il giorno più bello della nostra vita
    </p>

    <div class="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row">
      <div class="relative md:w-80 lg:w-96 flex-shrink-0 md:min-h-0 md:mr-5">
        <img
          src="/assets/img/wall_2.jpg"
          alt="La coppia"
          class="w-full h-full object-cover object-top rounded-2xl"
        />
      </div>

      <div class="flex-1 flex flex-col">
        <div class="p-6 flex flex-col gap-3">
          <p class="allison-regular text-2xl md:text-3xl">Ristorante Le Querce</p>
          <p class="font-body text-sm leading-relaxed text-gray-600">
            Il grande giorno si terrà interamente presso il ristorante <em>Le Querce</em> di Ponzano
            Veneto, che ci accoglierà col suo parco. Vi aspettiamo!
          </p>

          <ul class="font-body text-sm text-gray-700 flex flex-col gap-2 mt-1">
            <li class="flex items-start gap-2">
              <span>📍</span>
              <span>Via Talponera 130/A, Ponzano Veneto (TV)</span>
            </li>
            <li class="flex items-start gap-2">
              <span>🌳</span>
              <span>Ristorante con parco e giardino</span>
            </li>
            <li class="flex items-start gap-2">
              <span>🚗</span>
              <span>Parcheggio disponibile in loco</span>
            </li>
          </ul>
        </div>

        <div class="flex-1 min-h-75 md:min-h-85">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2785.463978173981!2d12.1691038!3d45.7217892!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477939f789b265d5%3A0xe086b0163e9529e7!2sRistorante%20Le%20Querce!5e0!3m2!1sit!2sit!4v1779206759546!5m2!1sit!2sit"
            class="w-full h-full min-h-75 md:min-h-85"
            style="border: 0; display: block"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>
