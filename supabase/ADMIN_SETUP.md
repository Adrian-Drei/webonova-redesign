# Webonova admin setup

1. Open the Supabase SQL Editor and run the migrations in filename order from `supabase/migrations`.
2. In **Authentication → Users**, create the administrator with email/password.
3. In the SQL Editor, grant that user the protected admin role:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'your-admin@email.com';
```

4. Sign in at `/admin/login`. Sign out and back in after any role change so the access token contains the new role.

The publishable browser key is intentionally unable to create tables or promote users. Row-level security allows public form submissions, but only an authenticated user whose `app_metadata.role` is `admin` can read or update inquiries and activity records.
