/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_PROXY_URL: string
  readonly RENDERER_VITE_DISABLE_OPEN_AUTHORIZATION_WINDOW: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
