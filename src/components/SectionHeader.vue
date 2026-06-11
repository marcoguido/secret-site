<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'section-header',
})

defineProps<{
  content: string
}>()
</script>

<template>
  <h2
    class="bacalisties-regular text-4xl md:text-7xl self-start text-left mb-6 text-mustard-yellow"
  >
    {{ content }}
  </h2>
</template>
