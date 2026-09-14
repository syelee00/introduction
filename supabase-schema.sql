create table if not exists public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 30),
  message text not null check (char_length(message) between 1 and 300),
  created_at timestamptz not null default now()
);

alter table public.guestbook_entries enable row level security;

create policy "Anyone can read guestbook entries" on public.guestbook_entries for select using (true);
create policy "Anyone can add guestbook entries" on public.guestbook_entries for insert with check (true);
