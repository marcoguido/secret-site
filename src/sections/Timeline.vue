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
      <div class="flex-1 flex flex-col timeline">
        <div
          v-for="(event, i) in events"
          :key="i"
          class="timeline-item cursor-pointer"
          @click="selected = selected === i ? null : i"
        >
          <span class="time text-mustard-yellow">{{ event.time }}</span>
          <div class="dot-col">
            <div class="dot text-powder-blue" :class="{ active: selected === i }">
              <component :is="event.icon" />
            </div>
          </div>
          <div class="card" :class="{ expanded: selected === i }">
            <div class="card-header">
              <strong>{{ event.title }}</strong>
            </div>
            <div class="desc">
              <p>{{ event.desc }}</p>
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

<style scoped>
.timeline {
  padding: 16px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 72px 42px 1fr;
  position: relative;
  padding-bottom: 14px;
}

.time {
  font-size: 16px;
  font-weight: 500;
  padding-top: 6px;
}

.dot-col {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-right: 12px;
}

.dot-col::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: -24px;
  width: 2px;
  background: #d9d9d9;
}

.timeline-item:last-child .dot-col::before {
  display: none;
}

.dot {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: white;
  border: 1px solid #d6d6d6;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.dot svg {
  width: 16px;
  height: 16px;
}

.card {
  border: 1px solid #ececec;
  border-radius: 16px;
  padding: 14px 18px;
  background: white;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.card-header strong {
  font-size: 16px;
  color: #7bbce3;
  font-weight: 600;
  font-style: italic;
}

@media (max-width: 768px) {
  .card-header strong {
    font-size: 13px;
  }

  .time {
    font-size: 13px;
    padding-top: 13px;
  }
}

.desc {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.card.expanded .desc {
  grid-template-rows: 1fr;
}

.desc p {
  overflow: hidden;
  min-height: 0;
  padding-top: 10px;
  font-size: 14px;
  color: #a0aec4f5;
  line-height: 1.4;
}
</style>
