<script setup lang="ts">
import { defineComponent } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'

defineComponent({
  name: 'logistics-section',
})
</script>

<template>
  <section
    class="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 bg-cream-background"
  >
    <section-header
      heading="Location"
      sub-heading="Siamo entusiasti di condividere con voi il giorno più bello della nostra vita"
    />

    <div class="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row">
      <div class="relative md:w-80 lg:w-96 shrink-0 md:min-h-0 md:mr-5">
        <img
          src="/assets/img/wall_2.webp"
          alt="La coppia"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover object-top rounded-2xl"
        />
      </div>

      <div class="flex-1 flex flex-col">
        <div class="p-6 flex flex-col gap-3">
          <p class="font-body text-gray-600">
            Il grande giorno si terrà interamente presso il ristorante
            <span
              class="bacalisties-regular text-powder-blue text-2xl inline-block align-middle relative -top-1.5"
              >Le Querce</span
            >, che ci accoglierà col suo parco e la sua bellissima struttura. Là ci saranno
            <b>Duska</b>, <b>Ermanno</b> e l'intero team del Ristorante ad occuparsi di ogni minima
            cosa!
          </p>

          <p class="text-gray-600">
            Qui trovate l'indirizzo del Ristorante:
          </p>

          <ul class="font-body text-sm text-gray-700 flex flex-col gap-2 mt-1">
            <li class="flex items-start gap-2">
              <span>📍</span>
              <span>Via Talponera 130/A, Ponzano Veneto (TV)</span>
            </li>
            <li class="flex items-start gap-2">
              <span>🚗</span>
              <span>Parcheggio disponibile in loco</span>
            </li>
          </ul>

          <p class="text-gray-600">
            ...Oppure cliccate sulla mappa sottostante per
            aprire Google Maps più comodamente
          </p>
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
