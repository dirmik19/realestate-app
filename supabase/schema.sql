-- 物件管理用テーブルの作成
-- Supabaseダッシュボードの「SQL Editor」で実行してください。

-- gen_random_uuid()を使うために必要な拡張機能を有効化
create extension if not exists pgcrypto;

-- 物件テーブル
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade, -- 登録したユーザー
  name text not null, -- 物件名
  rent integer not null, -- 家賃（円）
  area text not null, -- エリア名
  layout text not null, -- 間取り（例：1LDK）
  created_at timestamptz not null default now()
);

-- RLS（行レベルセキュリティ）を有効化
alter table public.properties enable row level security;

-- 自分が登録した物件のみ閲覧できる
drop policy if exists "Users can select their own properties" on public.properties;
create policy "Users can select their own properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 自分のuser_idでのみ物件を登録できる
drop policy if exists "Users can insert their own properties" on public.properties;
create policy "Users can insert their own properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
drop policy if exists "Users can update their own properties" on public.properties;
create policy "Users can update their own properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
drop policy if exists "Users can delete their own properties" on public.properties;
create policy "Users can delete their own properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
