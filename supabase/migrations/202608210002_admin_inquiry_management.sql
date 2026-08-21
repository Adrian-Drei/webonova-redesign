alter table public.project_inquiries
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists internal_notes text,
  add column if not exists contacted_at timestamptz;

alter table public.project_inquiries drop constraint if exists project_inquiries_status_check;
update public.project_inquiries set status = case status
  when 'reviewing' then 'in_progress'
  when 'replied' then 'contacted'
  when 'closed' then 'archived'
  else status end;
alter table public.project_inquiries add constraint project_inquiries_status_check
  check (status in ('new', 'contacted', 'in_progress', 'converted', 'archived'));

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
$$;

create policy "admins can view inquiries" on public.project_inquiries
  for select to authenticated using (public.is_admin());
create policy "admins can update inquiries" on public.project_inquiries
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins can delete inquiries" on public.project_inquiries
  for delete to authenticated using (public.is_admin());

create table if not exists public.inquiry_activities (
  id bigint generated always as identity primary key,
  inquiry_id uuid not null references public.project_inquiries(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  details text,
  created_at timestamptz not null default now()
);
alter table public.inquiry_activities enable row level security;
create policy "admins can view inquiry activity" on public.inquiry_activities
  for select to authenticated using (public.is_admin());
create policy "admins can add inquiry activity" on public.inquiry_activities
  for insert to authenticated with check (public.is_admin() and actor_id = auth.uid());
create index if not exists inquiry_activities_inquiry_idx on public.inquiry_activities(inquiry_id, created_at desc);

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
drop trigger if exists project_inquiries_touch_updated_at on public.project_inquiries;
create trigger project_inquiries_touch_updated_at before update on public.project_inquiries
for each row execute function public.touch_updated_at();

-- Run once after creating the administrator in Authentication > Users:
-- update auth.users set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
--   || '{"role":"admin"}'::jsonb where email = 'admin@example.com';
