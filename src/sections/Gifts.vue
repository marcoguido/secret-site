<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'gifts-section',
})

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
  <section
    class="min-h-screen w-full flex items-center justify-center p-8 snap-start"
    style="background-image: url('/assets/wall_4.jpg'); background-size: cover;"
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
</template>
