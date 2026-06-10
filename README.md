This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# FAMILY ALBUM

## 概要
子供の成長を両親や祖父母に共有し、大切な思い出を記録できるアプリです。

「離れて暮らす家族とも、日常の思い出を気軽に共有したい」という想いから開発しました。

家族単位でアカウントを管理し、写真・動画の投稿、コメント、アルバム閲覧などを通して、家族のコミュニケーションを深めることを目的としています。

## 主な機能
### 認証機能
- メールアドレス・パスワードによるログイン
- 新規登録
- パスワード変更
### 家族管理機能
- 家族グループの作成
- 招待コードによる家族参加
- 家族一覧表示
- 管理者による役割変更
  - 管理者（admin）
  - 編集者（editor）
  - 閲覧者（viewer）
- 管理者による削除
### 投稿機能
- 写真投稿
- 動画投稿
- タイトル入力
- 投稿詳細表示
- 投稿削除
  - 管理者または投稿者本人のみ削除可能
### コメント機能
- コメント投稿
- コメント一覧表示
- コメント数表示
### タイムライン機能
- 月ごとの投稿表示
- 月別タブ切替
- コメント数表示
### アルバム機能
- 月別アルバム表示
- 写真・動画の一覧表示

## 使用技術
### フロントエンド
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
### バックエンド
- Next.js Route Handle
- NextAuth.js
### データベース
- PostgreSQL
- Prisma ORM
### ストレージ
- Supabase Storage
### 開発環境
- Next.js
- npm
- VS Code

## データベース設計
主なテーブル
- User
- Profile
- Family
- FamilyMember
- Post
- Comment
- Invitation

家族単位でデータを分離し、他家族の投稿を閲覧できない設計としています。

## 工夫した点
- 家族ごとに投稿を分離し、安全に利用できる設計
- 招待コードによるシンプルな家族参加フロー
- 管理者・編集者・閲覧者の権限管理
- コンポーネント分割による保守性の向上

