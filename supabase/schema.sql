-- ============================================
-- NexaFlow AI Agency — Supabase Schema
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- Leads Table (contact form submissions)
-- ============================================
create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'lost')),
  source text default 'landing_page',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for faster lookups
create index idx_leads_status on public.leads(status);
create index idx_leads_created_at on public.leads(created_at desc);

-- ============================================
-- Services Table (manage services dynamically)
-- ============================================
create table public.services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  icon text default 'bolt',
  sort_order integer default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Insert default services
insert into public.services (title, description, icon, sort_order) values
  ('RAG & Chatbots', 'Deploy custom AI assistants trained on your data. Customer support, internal search, document Q&A — covered.', 'chatbot', 1),
  ('Workflow Automation', 'Automate repetitive tasks — data entry, approvals, reporting. We connect your tools into seamless pipelines.', 'workflow', 2),
  ('AI Integration', 'Plug LLMs into your existing software stack. CRM enrichment, auto-replies, smart routing, and more.', 'integration', 3),
  ('Custom AI Apps', 'From idea to launch. We design and build full-stack AI applications tailored to your business needs.', 'app', 4);

-- ============================================
-- Site Stats Table (track analytics)
-- ============================================
create table public.site_stats (
  id uuid primary key default uuid_generate_v4(),
  metric text not null,
  value integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (metric)
);

-- Insert default stats
insert into public.site_stats (metric, value) values
  ('projects_delivered', 50),
  ('efficiency_gain', 3),
  ('response_hours', 24);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
alter table public.leads enable row level security;
alter table public.services enable row level security;
alter table public.site_stats enable row level security;

-- Leads: anyone can insert, only authenticated users can read/update
create policy "Anyone can submit leads"
  on public.leads for insert
  with check (true);

create policy "Anyone can view leads"  -- switch to authenticated in production
  on public.leads for select
  using (true);

-- Services: anyone can read active services
create policy "Anyone can view active services"
  on public.services for select
  using (is_active = true);

-- Site stats: anyone can read
create policy "Anyone can view site stats"
  on public.site_stats for select
  using (true);

-- ============================================
-- Functions
-- ============================================

-- Auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for leads updated_at
create trigger update_leads_updated_at
  before update on public.leads
  for each row
  execute function public.handle_updated_at();

-- ============================================
-- API Endpoints (for the frontend)
-- ============================================

-- Note: After creating this in Supabase dashboard,
-- the following API endpoints will be available:

-- POST /leads — insert a new lead
-- GET /leads — fetch leads (authenticated)
-- GET /services — fetch active services
-- GET /site_stats — fetch site statistics
