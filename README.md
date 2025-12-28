# 麻雀パイ学習アプリ

麻雀初心者向けのインタラクティブな学習Webアプリケーションです。クリックで牌を選んで手牌を作りながら、麻雀の基本的な役の構成（順子・刻子・雀頭）を学べます。

## 特徴

- **インタラクティブな学習**: クリックで牌を選んで14枚の手牌を作成
- **基本概念の説明**: 順子（シュンツ）、刻子（コーツ）、雀頭（ジャントウ）の説明と例
- **完全な牌セット**: 34種類の麻雀牌（字牌7種 + 萬子・筒子・索子各9種）
- **使いやすいUI**: 手牌エリア、リセット機能、枚数カウント表示

## 技術スタック

- **フレームワーク**: [Hono](https://hono.dev/) - 軽量Webフレームワーク
- **ランタイム**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **ビルドツール**: [Vite](https://vitejs.dev/)
- **SSR**: vite-ssr-components
- **言語**: TypeScript

## セットアップ

### 前提条件

- Node.js (推奨: 最新のLTS版)
- npm または yarn

### インストール

```bash
npm install
```

## 開発

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173/ にアクセスしてアプリケーションを確認できます。

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

ビルド後のアプリケーションをローカルでプレビューします。

## デプロイ

Cloudflare Workersにデプロイ：

```bash
npm run deploy
```

## 型生成

Cloudflare Workersの設定から型を生成：

```bash
npm run cf-typegen
```

生成された `CloudflareBindings` 型は以下のように使用します：

```ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## 使い方

1. 画面上部で順子・刻子・雀頭の説明を確認
2. 下部の「牌の山」から好きな牌をクリック
3. 「あなたの手牌」エリアに牌が追加される（最大14枚）
4. 手牌の牌をクリックすると削除できる
5. 「手牌をリセット」ボタンで一括クリア

## プロジェクト構成

```
mahjong-pai/
├── src/
│   ├── index.tsx      # メインアプリケーション（ルート定義、牌データ）
│   ├── renderer.tsx   # JSXレンダラー設定
│   └── style.css      # スタイルシート
├── public/            # 静的ファイル
├── wrangler.jsonc     # Cloudflare Workers設定
├── vite.config.ts     # Vite設定
└── package.json       # 依存関係とスクリプト
```

## ライセンス

MIT
