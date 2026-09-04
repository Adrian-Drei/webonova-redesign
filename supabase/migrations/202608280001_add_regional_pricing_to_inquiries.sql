alter table public.project_inquiries
  add column if not exists pricing_region text,
  add column if not exists pricing_currency text,
  add column if not exists pricing_amount integer;

alter table public.project_inquiries
  drop constraint if exists project_inquiries_pricing_region_check,
  drop constraint if exists project_inquiries_pricing_currency_check,
  drop constraint if exists project_inquiries_pricing_amount_check;

alter table public.project_inquiries
  add constraint project_inquiries_pricing_region_check
    check (pricing_region is null or pricing_region in ('PH', 'INTERNATIONAL')),
  add constraint project_inquiries_pricing_currency_check
    check (pricing_currency is null or pricing_currency in ('PHP', 'USD')),
  add constraint project_inquiries_pricing_amount_check
    check (pricing_amount is null or pricing_amount > 0);
