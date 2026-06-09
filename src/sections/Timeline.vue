<script setup lang="ts">
import { ref } from 'vue'
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

const events = [
  {
    time: '11:30',
    icon: IconCirclesRelation,
    title: 'Cerimonia',
    tag: 'Rito',
    desc: 'Scambio dei voti davanti ai vostri cari.',
  },
  {
    time: '12:00',
    icon: IconCamera,
    title: 'Servizio fotografico',
    tag: 'Foto',
    desc: 'Passeggiata nei giardini per le foto di coppia e con le famiglie.',
  },
  {
    time: '13:30',
    icon: IconGlass,
    title: 'Aperitivo',
    tag: 'Welcome',
    desc: 'Benvenuto agli ospiti con Prosecco, tartine e musica ambient sul terrazzo panoramico.',
  },
  {
    time: '14:00',
    icon: IconToolsKitchen2,
    title: 'Pranzo nuziale',
    tag: 'Banchetto',
    desc: 'Menu a base di prodotti stagionali con pairing di vini selezionati.',
  },
  {
    time: '18:30',
    icon: IconChefHat,
    title: 'Buffet serale',
    tag: 'Banchetto',
    desc: 'Arrivo nuovi ospiti. Lancio del bouquet.',
  },
  {
    time: '19:30',
    icon: IconCake,
    title: 'Taglio della torta',
    tag: 'Dolce',
    desc: 'Taglio e servizio torta. Si mangerà la torta preferita degli sposi.',
  },
  {
    time: '21:15',
    icon: IconMusic,
    title: 'Festa & ballo',
    tag: 'Party',
    desc: 'DJ set e pista da ballo aperta. First dance della coppia, poi tutti in pista fino alle 23:00.',
  },
  {
    time: '23:30',
    icon: IconMoonStars,
    title: 'Buonanotte',
    tag: 'Rientro',
    desc: 'Grazie e buon rientro.',
  },
]

const selected = ref<number | null>(null)
</script>

<template>
  <section
    class="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 snap-start bg-cream-background"
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
          <span class="time">{{ event.time }}</span>
          <div class="dot-col">
            <div class="dot" :class="{ active: selected === i }">
              <component :is="event.icon" />
            </div>
          </div>
          <div class="card" :class="{ expanded: selected === i }">
            <div class="card-header">
              <strong>{{ event.title }}</strong>
              <span class="tag">{{ event.tag }}</span>
            </div>
            <p v-if="selected === i">{{ event.desc }}</p>
          </div>
        </div>
      </div>

      <div class="relative md:w-90 lg:w-100 flex-shrink-0 min-h-72 md:min-h-0 md:ml-3">
        <img
          src="/assets/img/wall_4.jpg"
          alt="La coppia"
          class="w-full h-full object-cover object-top rounded-2xl max-h-144"
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
  color: #7bbce3;
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
  color: #7bbce3;
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

.tag {
  font-size: 12px;
  background: #eeedfe;
  color: #534ab7;
  border-radius: 999px;
  padding: 4px 10px;
  white-space: nowrap;
}

.card p {
  margin-top: 10px;
  font-size: 14px;
  color: #a0aec4f5;
  line-height: 1.4;
}
</style>
