<script setup lang="ts">
import { defineComponent, defineProps } from 'vue'
import SectionHeader from '@/components/Layout/SectionHeader.vue'

defineComponent({
  name: 'site-section',
})

defineProps<{
  heading: string
  subHeading?: string
  headingAlignment?: 'left' | 'center' | 'right'
}>()
</script>

<template>
  <section
    class="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 bg-cream-background"
  >
    <section-header :heading :sub-heading :align="headingAlignment" />

    <div class="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row font-body text-gray-600 leading-relaxed">
      <slot name="content" />
    </div>
  </section>
</template>
