<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import SiteSection from '@/components/Layout/SiteSection.vue'
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
    title: '🎉 Benvenuti a tutti',
    desc: "Aspetteremo l'inizio della celebrazione nel parco del ristorante, sorseggiando un gradevole analcolico",
  },
  {
    time: '11:30',
    icon: IconCirclesRelation,
    title: '💍 Rito Civile',
    desc: 'Ci scambieremo i voti nel parco del ristorante e poi saremo ufficialmente Marito e Moglie: preparate i fazzoletti',
  },
  {
    time: '12:00',
    icon: IconCamera,
    title: '📸 Servizio fotografico',
    desc: 'Passeggiata nei giardini per le foto di coppia, ma anche per quelle con famiglie ed amici',
  },
  {
    time: '13:00',
    icon: IconGlass,
    title: '🥂 Aperitivo',
    desc: 'Si aprono le danze: Prosecco, tartine e musica vi aspettano tra terrazza e veranda per iniziare i festeggiamenti',
  },
  {
    time: '14:00',
    icon: IconToolsKitchen2,
    title: '🍴 Pranzo nuziale',
    desc: 'Il menu è una sorpresa: per ora vi basti sapere che Ermanno è uno Chef con la C maiuscola e saprà stupire i palati di ognuno, promesso!',
  },
  {
    time: '18:30',
    icon: IconChefHat,
    title: '🧑‍🍳 Buffet serale',
    desc: 'Arrivo degli ospiti della sera. Si prosegue con un buffet e, soprattutto, con il lancio del bouquet 💐',
  },
  {
    time: '19:30',
    icon: IconCake,
    title: '🍰 Taglio della torta',
    desc: 'Taglio e servizio torta nuziale: nessuno spoiler sulla torta, vi basti sapere che è la preferita degli sposi',
  },
  {
    time: '21:15',
    icon: IconMusic,
    title: '💃 FESTA 🕺',
    desc: 'Si aprono le danze (letteralmente): DJ set e pista da ballo saranno a disposizione, per il divertimento di tutti!',
  },
  {
    time: '00:00',
    icon: IconMoonStars,
    title: '😴 Buonanotte, grazie a tutti',
    desc: 'Come ogni cosa bella, ci sarà -ahinoi- anche la fine di questa memorabile giornata',
  },
]

const selected = ref<number | null>(0)
</script>

<template>
  <site-section
    heading="Timeline"
    sub-heading="A voi una piccola anticipazione dei momenti salienti della giornata"
    headingAlignment="right"
  >
    <template #content>
      <div class="flex-1 flex flex-col pr-4">
        <div
          v-for="(event, i) in events"
          :key="i"
          class="grid grid-cols-[72px_42px_1fr] relative pb-3.5 cursor-pointer"
          @click="selected = selected === i ? null : i"
        >
          <span class="text-powder-blue text-[13px] md:text-base font-medium pt-3.25 md:pt-3">
            {{ event.time }}
          </span>
          <div
            class="relative flex justify-center pt-2.5 pr-3 before:content-[''] before:absolute before:top-2.5 before:-bottom-6 before:w-0.5 before:bg-[#d9d9d9]"
            :class="{ 'before:hidden': i === events.length - 1 }"
          >
            <div
              class="w-7 h-7 rounded-full bg-white border border-[#d6d6d6] flex items-center justify-center z-2 text-[#a0aec4f5]"
            >
              <component :is="event.icon" :size="16" />
            </div>
          </div>
          <div class="border border-[#ececec] rounded-2xl py-3.5 px-4.5 bg-white">
            <div class="flex items-center justify-between gap-2.5">
              <strong class="text-[13px] md:text-base text-powder-blue font-bold">
                {{ event.title }}
              </strong>
            </div>
            <div
              class="grid transition-[grid-template-rows] duration-300 ease-[ease]"
              :class="selected === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden min-h-0">
                <p class="pt-2.5 text-sm text-gray-600 leading-[1.4]">
                  {{ event.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative md:w-90 lg:w-100 shrink-0 min-h-72 md:min-h-0 md:ml-3">
        <img
          src="/assets/img/wall_5.webp"
          alt="La coppia"
          class="w-full h-full object-cover object-top rounded-2xl max-h-144"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </template>
  </site-section>
</template>
