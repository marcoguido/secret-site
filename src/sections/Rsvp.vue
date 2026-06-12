<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import SiteSection from '@/components/Layout/SiteSection.vue'

defineComponent({
  name: 'rsvp-section',
})

// Google Form field IDs (the form this section proxies to).
const ENTRY_NAME = 'entry.289262896'
const ENTRY_ATTENDANCE = 'entry.877086558'
const ENTRY_COMPANIONS = 'entry.1498135098'
const ENTRY_ALLERGIES = 'entry.2606285'

// Radio values must match the Google Form options EXACTLY.
const attendanceOptions = ['Sì, parteciperò', 'No, non posso partecipare', 'Non lo so ancora']

// The env var holds the form's viewform/share URL; normalize it to the
// `formResponse` endpoint that accepts POSTed answers.
const formResponseUrl = computed(() => {
  const url = (import.meta.env.VITE_GOOGLE_FORM_URL ?? '').trim()
  if (url.includes('/formResponse')) return url
  if (url.includes('/viewform')) return url.replace('/viewform', '/formResponse')
  return url.replace(/\/$/, '') + '/formResponse'
})

const fullName = ref('')
const attendance = ref('')
const companions = ref('')
const allergies = ref('')

type Status = 'idle' | 'submitting' | 'success' | 'error'
const status = ref<Status>('idle')

const onSubmit = async (): Promise<void> => {
  if (!fullName.value.trim() || !attendance.value) return

  status.value = 'submitting'

  const body = new URLSearchParams({
    [ENTRY_NAME]: fullName.value.trim(),
    [ENTRY_ATTENDANCE]: attendance.value,
    [ENTRY_COMPANIONS]: companions.value.trim(),
    [ENTRY_ALLERGIES]: allergies.value.trim(),
  })

  try {
    // The response is opaque (cross-origin), so a resolved fetch is treated as
    // success and a thrown network error as failure.
    await fetch(formResponseUrl.value, { method: 'POST', mode: 'no-cors', body })
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <site-section
    heading="Ci sarai per l'evento dell'anno?"
    sub-heading="Aiutaci a organizzare al meglio la giornata"
    headingAlignment="center"
  >
    <template #content>
      <div class="w-full max-w-2xl mx-auto">
        <div v-if="status === 'success'" class="flex flex-col items-center gap-3 text-center py-10">
          <p class="allison-regular text-powder-blue text-5xl tracking-wide">Grazie!</p>
          <p class="text-lg">Abbiamo ricevuto la tua risposta 💛</p>
        </div>

        <form v-else class="flex flex-col gap-6" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-2">
            <label for="rsvp-name" class="font-semibold text-gray-700">
              Nome e cognome <span class="text-mustard-yellow">*</span>
            </label>
            <input
              id="rsvp-name"
              v-model="fullName"
              type="text"
              required
              autocomplete="name"
              placeholder="Mario Rossi"
              class="rounded-xl border-2 border-mustard-yellow bg-cream-background px-4 py-3 outline-none focus:border-powder-blue"
            />
          </div>

          <fieldset class="flex flex-col gap-2">
            <legend class="font-semibold text-gray-700 mb-2">
              Parteciperai? <span class="text-mustard-yellow">*</span>
            </legend>
            <label
              v-for="option in attendanceOptions"
              :key="option"
              class="flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition-colors"
              :class="
                attendance === option
                  ? 'border-powder-blue bg-powder-blue/10'
                  : 'border-mustard-yellow bg-cream-background'
              "
            >
              <input
                v-model="attendance"
                type="radio"
                name="attendance"
                :value="option"
                required
                class="accent-powder-blue"
              />
              <span>{{ option }}</span>
            </label>
          </fieldset>

          <div class="flex flex-col gap-2">
            <label for="rsvp-companions" class="font-semibold text-gray-700">
              Con chi verrai? Indica nomi e cognomi
            </label>
            <input
              id="rsvp-companions"
              v-model="companions"
              type="text"
              placeholder="I nomi di chi ti accompagna"
              class="rounded-xl border-2 border-mustard-yellow bg-cream-background px-4 py-3 outline-none focus:border-powder-blue"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="rsvp-allergies" class="font-semibold text-gray-700">
              Intolleranze o allergie?
            </label>
            <textarea
              id="rsvp-allergies"
              v-model="allergies"
              rows="3"
              placeholder="Facci sapere se hai esigenze particolari a tavola"
              class="rounded-xl border-2 border-mustard-yellow bg-cream-background px-4 py-3 outline-none focus:border-powder-blue resize-none"
            />
          </div>

          <p v-if="status === 'error'" class="text-center text-red-500">
            Qualcosa è andato storto. Riprova tra poco, per favore.
          </p>

          <button
            type="submit"
            :disabled="status === 'submitting'"
            class="self-center rounded-xl bg-mustard-yellow px-8 py-3 font-semibold text-cream-background transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ status === 'submitting' ? 'Invio in corso…' : 'Conferma' }}
          </button>
        </form>
      </div>
    </template>
  </site-section>
</template>
