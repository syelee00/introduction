-- Run this file in the Supabase Dashboard SQL Editor.
-- The portfolio has a public, anonymous guestbook: visitors can read and add entries.
-- Editing and deleting are intentionally not exposed by the product and are denied by RLS.

create table if not exists public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 30),
  message text not null check (char_length(btrim(message)) between 1 and 300),
  created_at timestamptz not null default now()
);

comment on table public.guestbook_entries is 'Public portfolio guestbook entries.';

create index if not exists guestbook_entries_created_at_desc_idx
  on public.guestbook_entries (created_at desc);

alter table public.guestbook_entries enable row level security;

drop policy if exists "Public can read guestbook entries" on public.guestbook_entries;
create policy "Public can read guestbook entries"
  on public.guestbook_entries for select
  to anon
  using (true);

drop policy if exists "Public can add guestbook entries" on public.guestbook_entries;
create policy "Public can add guestbook entries"
  on public.guestbook_entries for insert
  to anon
  with check (
    char_length(btrim(name)) between 1 and 30
    and char_length(btrim(message)) between 1 and 300
  );

-- No update or delete policy: anonymous visitors cannot alter or remove any entry.
