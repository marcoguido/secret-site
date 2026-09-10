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
  {
    display: `IBAN: ${props.iban}`,
    value: props.iban,
    copy: true,
    label: 'Copia IBAN',
    subject: 'IBAN',
    textClass: 'font-display text-lg select-all',
  },
  {
    display: `Intestatari: ${props.holder}`,
    value: props.holder,
    copy: true,
    label: 'Copia intestatario',
    subject: 'Intestatario',
    textClass: 'font-body text-lg select-all',
  },
  {
    display: 'Causale: Viaggio di nozze Carlotta e Marco',
    value: 'Viaggio di nozze Carlotta e Marco',
    copy: true,
    label: 'Copia causale',
    subject: 'Causale',
    textClass: 'font-body text-lg select-all',
  },
  {
    display: `Banca: ${props.bank}`,
    value: `Banca: ${props.bank}`,
    copy: false,
    label: 'Copia banca',
    subject: 'Nome della banca',
    textClass: 'font-body text-lg select-all',
  },
])

const copyText = async (subject: string, value: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(value)
    alert(`È possibile incollare ${subject} dagli appunti`)
  } catch (err) {
    console.error('Failed to copy: ', err)
    alert(`Errore durante la copia di ${subject}, trascrivilo manualmente.`)
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
      <p :class="row.textClass">{{ row.display }}</p>
      <button
        v-if="row.copy"
        @click="copyText(row.subject, row.value)"
        :aria-label="row.label"
        :title="row.label"
        class="shrink-0 p-1 rounded-full hover:bg-cream-background/20 cursor-pointer transition-colors duration-200 focus:outline-none"
      >
        <copy-icon />
      </button>
    </div>
  </div>
</template>
