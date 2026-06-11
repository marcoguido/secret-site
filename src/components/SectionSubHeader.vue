<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'section-sub-header',
})

defineProps<{
  content: string
}>()
</script>

<template>
  <h3 class="text-xl md:text-2xl self-start mb-6 text-[#a0aec4f5]">
    {{ content }}
  </h3>
</template>
