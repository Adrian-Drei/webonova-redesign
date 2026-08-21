create table if not exists public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null,
  company text,
  phone text,
  service text not null,
  package text not null check (package in ('essential','premium','unsure')),
  launch_timeline text,
  budget text,
  description text not null check (char_length(description) between 20 and 1500),
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new','reviewing','replied','closed'))
);
alter table public.project_inquiries enable row level security;
create policy "public can submit project inquiries" on public.project_inquiries for insert to anon, authenticated with check (consent = true);
create index if not exists project_inquiries_created_at_idx on public.project_inquiries (created_at desc);
create index if not exists project_inquiries_status_idx on public.project_inquiries (status);
