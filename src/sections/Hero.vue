<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineComponent } from 'vue'

defineComponent({
  name: 'hero-section',
})

const props = defineProps<{
  targetDate: Date
  thankYouDate: Date
}>()

const now = ref(new Date())

let timer: number | undefined

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
    if (phase.value === 'thanks') clearInterval(timer)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const phase = computed<'countdown' | 'ceremony' | 'thanks'>(() => {
  if (now.value.getTime() >= props.thankYouDate.getTime()) return 'thanks'
  if (now.value.getTime() >= props.targetDate.getTime()) return 'ceremony'
  return 'countdown'
})

const timeLeft = computed(() => {
  const diff = props.targetDate.getTime() - now.value.getTime()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
})
</script>

<template>
  <section
    class="relative h-screen w-full flex items-center justify-center"
    style="
      background-image: url('/assets/img/wall_1.webp');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    "
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="relative z-10 text-center text-white p-4">
      <transition name="fade" mode="out-in">
        <div v-if="phase === 'countdown'" key="countdown" class="mt-8">
          <h2 class="text-body text-2xl md:text-4xl mt-4 text-shadow-md">
            Si avvicina il
            <span
              class="bacalisties-regular text-powder-blue inline-block align-middle text-4xl md:text-6xl relative -top-1"
              >sì</span
            >
            di
          </h2>
          <h1 class="bacalisties-regular text-6xl md:text-8xl text-powder-blue text-shadow-lg my-4">
            Carlotta & Marco
          </h1>
          <div class="flex justify-center space-x-4 mt-2 mb-5">
            <div class="flex flex-col items-center mr-2">
              <span class="font-display text-4xl md:text-6xl text-mustard-yellow text-shadow-lg">{{
                timeLeft.days
              }}</span>
              <span class="font-body text-sm md:text-base text-shadow-md">Giorni</span>
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

        <div v-else-if="phase === 'ceremony'" key="ceremony" class="mt-8 relative">
          <p class="bacalisties-regular text-6xl md:text-8xl text-powder-blue text-shadow-lg">
            Vi aspettiamo!
          </p>
          <p class="font-body text-xl md:text-2xl mt-8 text-shadow-md">
            La <span class="text-mustard-yellow">cerimonia</span> sta per iniziare️
          </p>

          <span v-for="n in 6" :key="n" class="heart" :style="{ '--i': n }">❤</span>
        </div>

        <div v-else key="thanks" class="mt-8 relative">
          <p class="bacalisties-regular text-6xl md:text-8xl text-powder-blue text-shadow-lg">
            Grazie di cuore ad <span class="text-mustard-yellow">ognuno</span> di voi
          </p>
          <p class="font-body text-base text-xl md:text-2xl mt-8 text-shadow-md">
            <span v-for="n in 6" :key="n" class="heart" :style="{ '--i': n }">❤</span>
          </p>
        </div>
      </transition>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.heart {
  position: absolute;
  bottom: -3.5rem;
  left: calc((var(--i) * 14%));
  font-size: 1.5rem;
  color: #e8a0a0;
  opacity: 0;
  animation: floatUp 4s ease-in infinite;
  animation-delay: calc(var(--i) * 0.6s);
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 0;
  }
  15% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(-120px) scale(1.1);
    opacity: 0;
  }
}
</style>
