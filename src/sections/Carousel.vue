<script setup lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'

defineComponent({
  name: 'carousel-section',
})

const carouselImages = computed(() => {
  const images = []
  for (let i = 0; i < 18; i++) {
    images.push({
      id: `img-${i}`,
      path: `/assets/img/carousel_${i + 1}.webp`,
      alt: `Image number ${i} of the carousel`,
    })
  }

  return images
})

// Auto-scroll: one full copy of the list scrolls past every SECONDS_PER_LOOP.
const SECONDS_PER_LOOP = 60
const RESUME_DELAY_MS = 1500

const track = ref<HTMLElement | null>(null)

// Auto-scroll pauses while the user hovers, drags, or has recently scrolled/swiped.
const hovering = ref(false)
const dragging = ref(false)
const interacting = ref(false)

let rafId = 0
let lastT = 0
let interactTimer: number | undefined
let reduceMotion = false

let dragStartX = 0
let dragStartScroll = 0

const markInteraction = (): void => {
  interacting.value = true
  if (interactTimer) clearTimeout(interactTimer)
  interactTimer = window.setTimeout(() => {
    interacting.value = false
  }, RESUME_DELAY_MS)
}

const step = (t: number): void => {
  const el = track.value
  if (el) {
    const half = el.scrollWidth / 2 // width of a single (un-cloned) copy
    if (half > 0) {
      const idle = !hovering.value && !dragging.value && !interacting.value
      if (lastT && idle && !reduceMotion) {
        const dt = (t - lastT) / 1000
        el.scrollLeft += (half / SECONDS_PER_LOOP) * dt
      }
      // Seamless wrap: the second copy is identical to the first.
      if (el.scrollLeft >= half) el.scrollLeft -= half
      else if (el.scrollLeft < 0) el.scrollLeft += half
    }
  }
  lastT = t
  rafId = requestAnimationFrame(step)
}

// Mouse drag-to-scroll (touch uses native momentum scrolling instead).
const onPointerDown = (e: PointerEvent): void => {
  if (e.pointerType !== 'mouse') return
  dragging.value = true
  dragStartX = e.clientX
  dragStartScroll = track.value?.scrollLeft ?? 0
  track.value?.setPointerCapture(e.pointerId)
}

const onPointerMove = (e: PointerEvent): void => {
  if (!dragging.value || !track.value) return
  track.value.scrollLeft = dragStartScroll - (e.clientX - dragStartX)
}

const endDrag = (): void => {
  dragging.value = false
}

const onPointerLeave = (): void => {
  hovering.value = false
  endDrag()
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  rafId = requestAnimationFrame(step)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  if (interactTimer) clearTimeout(interactTimer)
})
</script>

<template>
  <section class="w-full h-48 overflow-hidden flex items-center bg-powder-blue">
    <div
      ref="track"
      class="flex w-full overflow-x-auto no-scrollbar select-none cursor-grab active:cursor-grabbing"
      @pointerenter="hovering = true"
      @pointerleave="onPointerLeave"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="endDrag"
      @pointercancel="endDrag"
      @wheel="markInteraction"
      @touchstart="markInteraction"
      @touchmove="markInteraction"
    >
      <img
        v-for="image in carouselImages"
        :key="image.id"
        :src="image.path"
        :alt="image.alt"
        loading="lazy"
        decoding="async"
        draggable="false"
        class="h-40 mr-4 object-cover rounded-lg shadow-md shrink-0 pointer-events-none"
      />
      <!-- Duplicate set so the auto-scroll wraps seamlessly with no blank gap -->
      <img
        v-for="image in carouselImages"
        :key="`${image.id}-clone`"
        :src="image.path"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable="false"
        class="h-40 mr-4 object-cover rounded-lg shadow-md shrink-0 pointer-events-none"
      />
    </div>
  </section>
</template>

<style scoped>
/* Hide the native scrollbar while keeping the element scrollable. */
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
