interface ImportMetaEnv {
  readonly NEXT_PUBLIC_API_URL: string
  readonly NEXT_PUBLIC_INITIAL_THEME: string
  readonly NEXT_PUBLIC_DISABLE_PAYMENT: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
