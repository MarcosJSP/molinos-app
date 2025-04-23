/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_APP_PROTOCOL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
