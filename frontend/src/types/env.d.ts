interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_INITIAL_THEME: string
  readonly VITE_DISABLE_PAYMENT: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
