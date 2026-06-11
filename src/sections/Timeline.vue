<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import {
  IconGlass,
  IconCamera,
  IconCirclesRelation,
  IconToolsKitchen2,
  IconChefHat,
  IconCake,
  IconMusic,
  IconMoonStars,
} from '@tabler/icons-vue'

defineComponent({
  name: 'timeline-section',
})

const events = [
  {
    time: '11:00',
    icon: IconGlass,
    title: 'Benvenuti a tutti!',
    desc: "Aspetteremo l'inizio della celebrazione nel parco del ristorante, sorseggiando un gradevole analcolico",
  },
  {
    time: '11:30',
    icon: IconCirclesRelation,
    title: 'Rito Civile',
    desc: 'Ci scambieremo i voti nel parco del ristorante e poi saremo ufficialmente Marito e Moglie: preparate i fazzoletti',
  },
  {
    time: '12:00',
    icon: IconCamera,
    title: 'Servizio fotografico',
    desc: 'Passeggiata nei giardini sia per le foto di coppia, ma anche per quelle con famiglie ed amici',
  },
  {
    time: '13:00',
    icon: IconGlass,
    title: 'Aperitivo',
    desc: 'Si aprono le danze: Prosecco, tartine e musica vi aspettano in terrazza e veranda per iniziare i festeggiamenti',
  },
  {
    time: '14:00',
    icon: IconToolsKitchen2,
    title: 'Pranzo nuziale',
    desc: 'Menu a base di prodotti stagionali con pairing di vini selezionati.',
  },
  {
    time: '18:30',
    icon: IconChefHat,
    title: 'Buffet serale',
    desc: 'Arrivo nuovi ospiti. Lancio del bouquet.',
  },
  {
    time: '19:30',
    icon: IconCake,
    title: 'Taglio della torta',
    desc: 'Taglio e servizio torta. Si mangerà la torta preferita degli sposi.',
  },
  {
    time: '21:15',
    icon: IconMusic,
    title: 'Festa & ballo',
    desc: 'DJ set e pista da ballo aperta. First dance della coppia, poi tutti in pista fino alle 23:00.',
  },
  {
    time: '23:30',
    icon: IconMoonStars,
    title: 'Buonanotte',
    desc: 'Grazie e buon rientro.',
  },
]

const selected = ref<number | null>(null)
</script>

<template>
  <section
    class="min-h-screen w-full flex flex-col items-center justify-start md:justify-center p-6 md:p-12 snap-start bg-cream-background"
  >
    <h2 class="allison-regular text-4xl md:text-6xl text-center mb-6">Timeline</h2>

    <div class="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row">
      <div class="flex-1 flex flex-col p-4">
        <div
          v-for="(event, i) in events"
          :key="i"
          class="grid grid-cols-[72px_42px_1fr] relative pb-[14px] cursor-pointer"
          @click="selected = selected === i ? null : i"
        >
          <span
            class="text-mustard-yellow text-[13px] md:text-base font-medium pt-[13px] md:pt-1.5"
            >
            {{ event.time }}
          </span>
          <div
            class="relative flex justify-center pt-2.5 pr-3 before:content-[''] before:absolute before:top-2.5 before:-bottom-6 before:w-0.5 before:bg-[#d9d9d9]"
            :class="{ 'before:hidden': i === events.length - 1 }"
          >
            <div
              class="w-7 h-7 rounded-full bg-white border border-[#d6d6d6] flex items-center justify-center z-[2] text-powder-blue"
            >
              <component :is="event.icon" :size="16" />
            </div>
          </div>
          <div class="border border-[#ececec] rounded-2xl py-[14px] px-[18px] bg-white">
            <div class="flex items-center justify-between gap-2.5">
              <strong class="text-[13px] md:text-base text-[#7bbce3] font-semibold italic">{{
                event.title
              }}</strong>
            </div>
            <div
              class="grid transition-[grid-template-rows] duration-300 ease-[ease]"
              :class="selected === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <p class="overflow-hidden min-h-0 pt-2.5 text-sm text-[#a0aec4f5] leading-[1.4]">
                {{ event.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative md:w-90 lg:w-100 shrink-0 min-h-72 md:min-h-0 md:ml-3">
        <img
          src="/assets/img/wall_4.webp"
          alt="La coppia"
          class="w-full h-full object-cover object-top rounded-2xl max-h-144"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
</template>
