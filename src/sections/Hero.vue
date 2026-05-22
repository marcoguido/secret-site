<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineComponent } from 'vue'

defineComponent({
  name: 'hero-section',
})

const targetDate = new Date('2026-11-14T11:30:00')
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
</script>

<template>
  <section
    class="relative h-screen w-full flex items-center justify-center snap-start"
    style="background-image: url('/assets/wall_1.jpg'); background-size: cover;"
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
    </div>
  </section>
</template>
