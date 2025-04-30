/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_APP_PROTOCOL: string
  readonly VITE_AUTH_PROXY_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
