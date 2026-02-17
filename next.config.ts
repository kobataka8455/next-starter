import type { NextConfig } from 'next';

const renderMode = process.env.NEXT_PUBLIC_RENDER_MODE || 'static';

const nextConfig: NextConfig = {
  // SSGモード時はStatic Exportで完全静的HTMLを出力
  output: renderMode === 'static' ? 'export' : undefined,

  // SCSS設定
  sassOptions: {
    additionalData: `@use 'sass:color';@use "@/styles/variables.scss" as v; @use "@/styles/mixins.scss" as m;`,
  },
};

export default nextConfig;
