<script setup lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import BankDetails from '@/components/BankDetails.vue'

defineComponent({
  name: 'gifts-section',
})

interface GiftItem {
  emoji: string
  name: string
  desc: string
  flipped: boolean
}

// On hover-capable devices the flip is driven by CSS :hover; on touch devices
// we fall back to a click/tap toggle.
const canHover = ref(false)

onMounted(() => {
  canHover.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
})

const toggleFlip = (item: GiftItem): void => {
  if (canHover.value) return
  item.flipped = !item.flipped
}

const travelIban = import.meta.env.VITE_TRAVEL_IBAN
const travelIbanHolder = import.meta.env.VITE_TRAVEL_IBAN_HOLDER
const travelIbanBank = import.meta.env.VITE_TRAVEL_IBAN_BANK
const giftIban = import.meta.env.VITE_GIFT_IBAN
const giftIbanHolder = import.meta.env.VITE_GIFT_IBAN_HOLDER
const giftIbanBank = import.meta.env.VITE_GIFT_IBAN_BANK

const giftItems = reactive<GiftItem[]>([
  { emoji: '🏍️', name: 'Aprilia RS660', desc: 'Il cambio di gusti di Guido', flipped: false },
  { emoji: '🚗', name: 'Hyundai i20N', desc: 'Il sogno della Carly', flipped: false },
  {
    emoji: '💊',
    name: 'Fermenti lattici',
    desc: 'NECESSARI per il viaggio di nozze',
    flipped: false,
  },
  { emoji: '🐈‍⬛', name: 'Pappe succulenti', desc: 'Per le nostre gattine', flipped: false },
  { emoji: '🏥', name: 'Medicine', desc: 'Per la maledetta allergia di Lucy', flipped: false },
  {
    emoji: '🎁',
    name: 'Souvenir',
    desc: "Promettiamo di portarvi un ricordo dall'Egitto",
    flipped: false,
  },
])
</script>

<template>
  <section
    class="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 snap-start bg-cream-background"
  >
    <h2 class="allison-regular text-4xl md:text-6xl text-center mb-2">Lista Nozze</h2>

    <div class="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row">
      <div class="relative md:w-80 lg:w-96 flex-shrink-0 md:mr-5 flex flex-col gap-3">
        <img
          src="/assets/img/wall_4.jpg"
          alt="La coppia"
          class="w-full object-cover object-top rounded-2xl sm:h-60"
        />
        <img
          src="/assets/img/pelose.jpg"
          alt="Le nostre gattine"
          class="w-full object-cover rounded-2xl max-h-80 sm:h-60"
        />
        <img
          src="/assets/img/wall_6.jpg"
          alt="Le nostre gattine"
          class="w-full object-cover rounded-2xl max-h-80 sm:h-60"
        />
      </div>

      <div class="flex-1 flex flex-col">
        <div class="p-3 flex flex-col gap-3 text-center">
          <p class="allison-regular text-3xl md:text-4xl">
            La vostra presenza è il regalo più grande che possiate farci!
          </p>
        </div>

        <div class="flex flex-col items-center gap-3 px-4 py-3">
          <p class="font-body text-sm leading-relaxed text-gray-600 text-center max-w-lg">
            Tuttavia, se avrete piacere di farci un dono, c'è la possibilità di aiutarci a prendere
            il volo (letteralmente) per girare il mondo, partecipando alla spesa per il nostro
            viaggio di nozze in Egitto.
          </p>
          <p class="font-body text-sm leading-relaxed text-gray-600 text-center max-w-lg">
            Alternativamente, con la vostra generosità, sappiate che
            <s>
              non abbiamo affatto in programma di comprare le cose presenti nella lista qui sotto
            </s>
            &nbsp;😁
          </p>

          <div class="flex flex-col md:flex-row gap-3 w-full">
            <bank-details
              v-if="false"
              title="✈️ Viaggio di nozze ✈️"
              :iban="travelIban"
              :holder="travelIbanHolder"
              :bank="travelIbanBank"
            />
            <bank-details
              title="🎁 Lista regali 🎁"
              :iban="giftIban"
              :holder="giftIbanHolder"
              :bank="giftIbanBank"
            />
          </div>
        </div>

        <div class="px-4 pb-4 flex flex-col md:flex-row gap-3">
          <div class="flex-1 order-2 md:order-1 min-h-40 md:min-h-0">
            <img
              src="/assets/img/egypt.jpeg"
              alt="Il nostro viaggio di nozze"
              class="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div class="flex-1 order-1 md:order-2 grid grid-cols-2 gap-2">
            <div
              v-for="item in giftItems"
              :key="item.name"
              class="flip-card cursor-pointer"
              :class="{ flipped: item.flipped }"
              @click="toggleFlip(item)"
            >
              <div class="flip-inner">
                <div
                  class="flip-front bg-cream-background border-mustard-yellow border-2 rounded-xl flex items-center justify-center"
                >
                  <span class="text-3xl">{{ item.emoji }}</span>
                </div>
                <div
                  class="flip-back bg-powder-blue rounded-xl flex flex-col items-center justify-center p-2 text-cream-background text-center"
                >
                  <p class="font-body font-semibold text-xs">{{ item.name }}</p>
                  <p class="font-body text-xs mt-1 opacity-80">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flip-card {
  height: 120px;
  perspective: 1000px;
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

.flip-card.flipped .flip-inner {
  transform: rotateY(180deg);
}

@media (hover: hover) and (pointer: fine) {
  .flip-card:hover .flip-inner {
    transform: rotateY(180deg);
  }
}

.flip-front,
.flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.flip-back {
  transform: rotateY(180deg);
}
</style>
