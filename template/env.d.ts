/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  readonly VITE_FEATURE_MOCK?: 'true' | 'false';
  readonly VITE_FEATURE_EXPORT?: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
