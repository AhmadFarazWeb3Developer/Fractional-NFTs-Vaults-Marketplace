interface ImportMetaEnv {
  readonly VITE_ALCHEMY_RPC_API_KEY?: string;
  readonly VITE_CONNECT_PROJECT_ID?: string;
  readonly VITE_SERVER_URL_V1?: string;
  readonly VITE_PINATA_GATEWAY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
