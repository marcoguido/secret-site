<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import CopyIcon from '@/components/CopyIcon.vue'

defineComponent({
  name: 'bank-details',
})

const props = defineProps<{
  title: string
  iban: string
  holder: string
  bank: string
}>()

const rows = computed(() => [
  { value: props.iban, label: 'Copia IBAN', textClass: 'font-display text-lg select-all' },
  { value: props.holder, label: 'Copia intestatario', textClass: 'font-body text-sm' },
  { value: `Banca: ${props.bank}`, label: 'Copia banca', textClass: 'font-body text-sm opacity-80' },
])

const copyText = async (value: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(value)
    alert('Copiato negli appunti!')
  } catch (err) {
    console.error('Failed to copy: ', err)
    alert('Errore durante la copia.')
  }
}
</script>

<template>
  <div class="bg-powder-blue text-cream-background p-4 rounded-lg shadow-lg text-center flex-1">
    <p class="font-body text-base font-semibold mb-2">{{ title }}</p>
    <div
      v-for="(row, index) in rows"
      :key="row.label"
      class="flex items-center justify-center gap-2"
      :class="index < rows.length - 1 ? 'mb-1' : ''"
    >
      <p :class="row.textClass">{{ row.value }}</p>
      <button
        @click="copyText(row.value)"
        :aria-label="row.label"
        :title="row.label"
        class="shrink-0 p-1 rounded-full hover:bg-cream-background/20 cursor-pointer transition-colors duration-200 focus:outline-none"
      >
        <copy-icon />
      </button>
    </div>
  </div>
</template>
