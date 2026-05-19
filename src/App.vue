<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const targetDate = new Date('2026-11-14T11:00:00')
const now = ref(new Date())

let timer: number | undefined

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const timeLeft = computed(() => {
  const diff = targetDate.getTime() - now.value.getTime()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
})

const openGoogleMaps = () => {
  window.open('https://maps.app.goo.gl/Hdm66Cy9UFjswtMC9', '_blank')
}

const copyIban = async () => {
  try {
    await navigator.clipboard.writeText('YOUR_IBAN_HERE') // Replace with actual IBAN
    alert('IBAN copiato negli appunti!')
  } catch (err) {
    console.error('Failed to copy IBAN: ', err)
    const errorMessage = `Errore durante la copia dell'IBAN.`
    alert(errorMessage)
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-cream-background text-powder-blue snap-y snap-mandatory overflow-y-scroll"
  >
    <section
      class="relative h-screen w-full flex items-center justify-center snap-start"
      style="background-image: url('https://picsum.photos/seed/carlyguidro/3840/2160')"
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative z-10 text-center text-white p-4">
        <h2 class="text-body text-2xl md:text-4xl mt-4 text-shadow-md">
          Si avvicina il
          <em class="allison-regular text-6xl md:text-8xl text-powder-blue">sì</em> di
        </h2>
        <h1 class="allison-regular text-6xl md:text-8xl text-powder-blue text-shadow-lg my-4">
          Carlotta & Marco
        </h1>
        <div class="mt-8">
          <div class="flex justify-center space-x-4 mt-2 mb-5">
            <div class="flex flex-row items-center">
              <span class="font-display text-4xl md:text-6xl text-mustard-yellow text-shadow-lg">{{
                timeLeft.days
              }}</span>
              <span class="font-body text-2xl text-shadow-md mx-5">Giorni</span>
            </div>
          </div>
          <div class="flex justify-center space-x-4 mt-2">
            <div class="flex flex-col items-center mr-2">
              <span class="font-display text-4xl md:text-6xl text-mustard-yellow text-shadow-lg">{{
                timeLeft.hours
              }}</span>
              <span class="font-body text-sm md:text-base text-shadow-md">Ore</span>
            </div>
            <div class="flex flex-col items-center mx-1">
              <span class="flex font-body text-6xl text-shadow-md ma-auto">·</span>
            </div>
            <div class="flex flex-col items-center mr-2">
              <span class="font-display text-4xl md:text-6xl text-mustard-yellow text-shadow-lg">{{
                timeLeft.minutes
              }}</span>
              <span class="font-body text-sm md:text-base text-shadow-md">Minuti</span>
            </div>
            <div class="flex flex-col items-center mx-1">
              <span class="flex font-body text-6xl text-shadow-md ma-auto">·</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="font-display text-4xl md:text-6xl text-mustard-yellow text-shadow-lg">{{
                timeLeft.seconds
              }}</span>
              <span class="font-body text-sm md:text-base text-shadow-md">Secondi</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Location & Logistica Section -->
    <section
      class="min-h-screen w-full flex items-center justify-center p-8 snap-start"
      style="background-image: url('https://picsum.photos/seed/carlyguidro1/3840/2160')"
    >
      <div class="max-w-3xl text-center">
        <h2 class="font-display text-5xl text-powder-blue mb-6 text-shadow-lg">
          Location & Logistica
        </h2>
        <p class="font-body text-lg leading-relaxed mb-8 text-shadow-md text-mustard-yellow">
          Siamo entusiasti di condividere con voi il giorno più bello della nostra vita. La
          cerimonia si terrà presso la Chiesa di San Pietro alle ore 16:00, seguita da un
          ricevimento indimenticabile presso la Villa dei Sogni. Vi aspettiamo!
        </p>
        <button
          @click="openGoogleMaps"
          class="bg-mustard-yellow text-cream-background font-body text-lg px-8 py-3 rounded-full hover:bg-mustard-yellow/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-powder-blue focus:ring-offset-2"
        >
          Apri su Google Maps
        </button>
      </div>
    </section>

    <!-- Visual Divider (Carousel) -->
    <section class="w-full h-48 overflow-hidden snap-start flex items-center bg-powder-blue">
      <div class="w-full flex space-x-4 animate-marquee whitespace-nowrap">
        <img
          src="https://picsum.photos/seed/carousel1/720/480"
          alt="Wedding Photo 1"
          class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
        />
        <img
          src="https://picsum.photos/seed/carousel2/720/480"
          alt="Wedding Photo 2"
          class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
        />
        <img
          src="https://picsum.photos/seed/carousel3/720/480"
          alt="Wedding Photo 3"
          class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
        />
        <img
          src="https://picsum.photos/seed/carousel4/720/480"
          alt="Wedding Photo 4"
          class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
        />
        <img
          src="https://picsum.photos/seed/carousel5/720/480"
          alt="Wedding Photo 5"
          class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
        />
        <!-- Duplicate for infinite scroll effect -->
        <img
          src="https://picsum.photos/seed/carousel6/720/480"
          alt="Wedding Photo 1"
          class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
        />
        <img
          src="https://picsum.photos/seed/carousel7/720/480"
          alt="Wedding Photo 2"
          class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
        />
        <img
          src="https://picsum.photos/seed/carousel8/720/480"
          alt="Wedding Photo 3"
          class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
        />
        <img
          src="https://picsum.photos/seed/carousel9/720/480"
          alt="Wedding Photo 4"
          class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
        />
        <img
          src="https://picsum.photos/seed/carousel10/720/480"
          alt="Wedding Photo 5"
          class="h-40 object-cover rounded-lg shadow-md flex-shrink-0"
        />
      </div>
    </section>

    <!-- Gift Section / Wedding List -->
    <section
      class="min-h-screen w-full flex items-center justify-center p-8 snap-start"
      style="background-image: url('https://picsum.photos/seed/carlyguidro2/3840/2160')"
    >
      <div class="max-w-3xl text-center">
        <h2 class="font-display text-5xl text-powder-blue mb-6 text-shadow-lg">Lista Nozze</h2>
        <p class="font-body text-lg leading-relaxed mb-8 text-shadow-md">
          La vostra presenza è il regalo più grande! Tuttavia, se desiderate farci un dono, un
          contributo al nostro viaggio di nozze sarebbe molto apprezzato.
        </p>
        <div class="bg-powder-blue text-cream-background p-6 rounded-lg shadow-lg inline-block">
          <p class="font-body text-xl font-semibold mb-4">IBAN:</p>
          <p id="iban-text" class="font-display text-2xl mb-6 select-all">YOUR_IBAN_HERE</p>
          <!-- Replace with actual IBAN -->
          <button
            @click="copyIban"
            class="bg-mustard-yellow text-cream-background font-body text-lg px-8 py-3 rounded-full hover:bg-mustard-yellow/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-mustard-yellow focus:ring-offset-2"
          >
            Copia IBAN
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 60s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.snap-y.snap-mandatory {
  scroll-snap-type: y mandatory;
}

.snap-start {
  scroll-snap-align: start;
}
</style>
