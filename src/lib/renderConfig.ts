/**
 * SSR/SSG/ISR 切り替え設定
 *
 * 環境変数 NEXT_PUBLIC_RENDER_MODE で制御:
 * - 'static': Static Export（完全静的HTML出力） → next.config.ts で output: 'export' が設定される
 * - 'ssr': Server-Side Rendering（リクエスト毎にレンダリング）
 * - 'isr': Incremental Static Regeneration（静的生成 + 定期再生成）
 *
 * ## SSR/SSG切り替えの仕組み
 *
 * Next.jsの `export const dynamic` はリテラル値が必要なため、関数呼び出しでは設定できない。
 * そのため、切り替えは以下の2段階で行う：
 *
 * 1. next.config.ts: RENDER_MODE === 'static' の場合 output: 'export' を設定
 *    → 全ページが静的HTMLとして出力される
 *
 * 2. SSRモードで個別ページの動的/静的を制御したい場合は、
 *    ページファイルで直接 export const dynamic = 'force-dynamic' を指定する
 */

type RenderMode = 'static' | 'ssr' | 'isr';

export const RENDER_MODE: RenderMode =
  (process.env.NEXT_PUBLIC_RENDER_MODE as RenderMode) || 'static';

export const REVALIDATE_INTERVAL =
  Number(process.env.NEXT_PUBLIC_REVALIDATE_INTERVAL) || 3600;
