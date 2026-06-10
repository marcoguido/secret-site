/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRAVEL_IBAN: string
  readonly VITE_TRAVEL_IBAN_HOLDER: string
  readonly VITE_TRAVEL_IBAN_BANK: string
  readonly VITE_GIFT_IBAN: string
  readonly VITE_GIFT_IBAN_HOLDER: string
  readonly VITE_GIFT_IBAN_BANK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
