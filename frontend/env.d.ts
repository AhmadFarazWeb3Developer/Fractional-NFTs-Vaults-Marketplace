interface ImportMetaEnv {
  readonly VITE_ALCHEMY_RPC_API_KEY?: string;
  readonly VITE_CONNECT_PROJECT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
