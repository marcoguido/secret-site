<script setup lang="ts">
import { defineComponent } from 'vue'
import { reactive } from 'vue'

defineComponent({
  name: 'gifts-section',
})

const copyIban = async (id: string): Promise<void> => {
  try {
    const el = document.getElementById(id)
    if (!el) return
    await navigator.clipboard.writeText(el.textContent ?? '')
    alert('IBAN copiato negli appunti!')
  } catch (err) {
    console.error('Failed to copy IBAN: ', err)
    alert("Errore durante la copia dell'IBAN.")
  }
}

const giftItems = reactive([
  { emoji: '🏍️', name: 'Aprilia RS660', desc: 'Il cambio di gusti di Guido', flipped: false },
  { emoji: '🚗', name: 'Hyundai i20N', desc: 'Il sogno della Carly', flipped: false },
  { emoji: '🐱', name: 'Pappe', desc: 'Per le nostre gattine', flipped: false },
  {
    emoji: '🍿',
    name: 'Snack',
    desc: 'Per viziare ancora di più le nostre gattine',
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
          src="/assets/img/wall_2.jpg"
          alt="La coppia"
          class="w-full object-cover object-top rounded-2xl sm:h-60"
        />
        <img
          src="/assets/img/pelose.jpg"
          alt="Le nostre gattine"
          class="w-full object-cover rounded-2xl max-h-80 sm:h-60"
        />
      </div>

      <div class="flex-1 flex flex-col">
        <!-- Titolo -->
        <div class="p-3 flex flex-col gap-3 text-center">
          <p class="allison-regular text-3xl md:text-4xl">
            La vostra presenza è il regalo più grande!
          </p>
        </div>

        <!-- Testo + card IBAN -->
        <div class="flex flex-col items-center gap-3 px-4 py-3">
          <p class="font-body text-sm leading-relaxed text-gray-600 text-center max-w-lg">
            Tuttavia, se desiderate farci un dono, un contributo al nostro viaggio di nozze sarebbe
            molto apprezzato. Altrimenti, vi lasciamo alcune cose che potrete sovvenzionare tramite
            il nostro IBAN:
          </p>

          <div class="flex flex-col md:flex-row gap-3 w-full">
            <div
              class="bg-powder-blue text-cream-background p-4 rounded-lg shadow-lg text-center flex-1"
            >
              <p class="font-body text-base font-semibold mb-2">✈️ IBAN viaggio di nozze</p>
              <p id="iban-viaggio" class="font-display text-lg mb-3 select-all">YOUR_IBAN_HERE</p>
              <button
                @click="copyIban('iban-viaggio')"
                class="bg-mustard-yellow text-cream-background font-body text-sm px-6 py-2 rounded-full hover:bg-mustard-yellow/80 transition-colors duration-300 focus:outline-none"
              >
                Copia IBAN
              </button>
            </div>

            <div
              class="bg-powder-blue text-cream-background p-4 rounded-lg shadow-lg text-center flex-1"
            >
              <p class="font-body text-base font-semibold mb-2">🎁 IBAN lista regali</p>
              <p id="iban-regali" class="font-display text-lg mb-3 select-all">YOUR_IBAN_HERE</p>
              <button
                @click="copyIban('iban-regali')"
                class="bg-mustard-yellow text-cream-background font-body text-sm px-6 py-2 rounded-full hover:bg-mustard-yellow/80 transition-colors duration-300 focus:outline-none"
              >
                Copia IBAN
              </button>
            </div>
          </div>
        </div>

        <!-- Immagine + card regali -->
        <div class="px-4 pb-4 flex flex-col md:flex-row gap-3">
          <!-- Immagine viaggio (su mobile va sotto le card) -->
          <div class="flex-1 order-2 md:order-1 min-h-40 md:min-h-0">
            <img
              src="/assets/img/egitto.jpeg"
              alt="Il nostro viaggio di nozze"
              class="w-full h-full object-cover rounded-xl"
            />
          </div>

          <!-- Card flip regali -->
          <div class="flex-1 order-1 md:order-2 grid grid-cols-2 gap-2">
            <div
              v-for="item in giftItems"
              :key="item.name"
              class="flip-card cursor-pointer"
              :class="{ flipped: item.flipped }"
              @click="item.flipped = !item.flipped"
            >
              <div class="flip-inner">
                <div
                  class="flip-front bg-cream-background border border-powder-blue/40 rounded-xl flex items-center justify-center"
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
