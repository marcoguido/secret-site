<script setup lang="ts">
import { defineComponent, withDefaults } from 'vue'

defineComponent({
  name: 'section-header',
})

withDefaults(
  defineProps<{
    heading: string
    subHeading?: string
    alignment?: 'left' | 'center' | 'right'
  }>(),
  {
    alignment: 'left',
  },
)
</script>

<template>
  <div
    class="w-full max-w-6xl flex flex-col"
    :class="{
      'items-start': alignment === 'left',
      'items-end': alignment === 'right',
      'items-center': alignment === 'center',
    }"
  >
    <h2 class="bacalisties-regular text-4xl md:text-7xl mb-6 text-mustard-yellow">
      {{ heading }}
    </h2>

    <h3 v-if="!!subHeading" class="text-xl md:text-2xl mb-6 text-[#a0aec4f5]">
      {{ subHeading }}
    </h3>
  </div>
</template>
