/// <reference types="astro/client" />
/// <reference types="@astrojs/image/client" />
/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly API_KEY: string;
  readonly PUBLIC_MAPBOX_TOKEN: string;
  readonly PUBLIC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 