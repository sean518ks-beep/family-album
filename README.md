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
### いいね機能
- 投稿へのいいね
- いいね解除
- いいね数表示
### タイムライン機能
- 月ごとの投稿表示
- 月別タブ切替
- コメント数表示
### アルバム機能
- 月別アルバム表示

  月ごとに整理
- 自動アルバム
  
  キーワードに関する投稿を収集
- 写真・動画の一覧表示
### 検索機能
以下の内容で検索可能
- 投稿タイトル
- 投稿者名
- コメント内容

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
- Like
- AutoAlbum
- AutoAlbumItem

家族単位でデータを分離し、他家族の投稿を閲覧できない設計としています。

## 工夫した点
- 家族ごとに投稿を分離し、安全に利用できる設計
- 招待コードによるシンプルな家族参加フロー
- 管理者・編集者・閲覧者の権限管理
- 簡単に探せる検索機能
- 人気の写真や動画が一目でわかり、気軽に押せるいいねボタン
- コンポーネント分割による保守性の向上

## セットアップ
```bash
git clone <repository-url>

cd family-album

npm install

npx prisma generate

npx prisma db push

npm run dev
```

## 環境変数
```bash
.env.local

DATABASE_URL= 

NEXTAUTH_SECRET= 

NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL= 

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
```


