<script setup lang="ts">
import Hero from '@/sections/Hero.vue'
import Logistics from '@/sections/Logistics.vue'
import Timeline from '@/sections/Timeline.vue'
import Carousel from '@/sections/Carousel.vue'
import Gifts from '@/sections/Gifts.vue'
import Rsvp from '@/sections/Rsvp.vue'
import { ref } from 'vue'

const now = ref(new Date())

const targetDate = new Date('2026-11-14T11:30:00')
const thankYouDate = new Date('2026-11-15T01:00:00')
const rsvpDeadlineDate = new Date('2026-10-25T23:59:59')
</script>

<template>
  <div class="min-h-screen bg-cream-background text-powder-blue">
    <hero :target-date :thank-you-date />

    <logistics />

    <timeline />

    <gifts />

    <rsvp
      v-if="now.getTime() <= rsvpDeadlineDate.getTime()"
      :rsvp-deadline-date
    />

    <carousel />
  </div>
</template>
