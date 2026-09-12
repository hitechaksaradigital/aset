-- ============================================================================
-- AssetIQ Enterprise EAM — Skema Database (Supabase / PostgreSQL)
--
-- CARA PAKAI:
--   1. Buka Supabase Dashboard > SQL Editor
--   2. Salin & jalankan seluruh skrip ini
--   3. Tabel `assets` & `asset_mutations` akan terbuat + terisi data seed
--      sesuai desain halaman /katalog-aset
--
-- Keamanan: RLS diaktifkan dengan policy publik (anon key) agar aplikasi
-- demo ini bisa membaca & mendaftarkan aset tanpa login. Untuk produksi,
-- ganti policy dengan kebijakan berbasis auth (authenticated only).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. TABEL UTAMA: assets
-- ----------------------------------------------------------------------------
create table if not exists public.assets (
  id                 uuid primary key default gen_random_uuid(),
  asset_code         text not null unique,                -- contoh: AST-IT-0089
  full_id            text not null unique,                -- contoh: AST-2024-IT-0089
  name               text not null,                       -- nama aset
  short_name         text,                                -- nama pendek untuk inspector
  specs              text,                                -- spesifikasi ringkas (baris tabel)

  -- Klasifikasi & penempatan
  category_key       text not null,                       -- IT Datacenter | Kendaraan | Mesin Pabrik | Laptop & Gadget | Furniture
  category_label     text not null,                       -- label tampil di tabel
  location_key       text not null,                       -- HQ Jakarta | Pabrik Cikarang | Warehouse SBY | Site Balikpapan
  location_label     text not null,                       -- detail lokasi, mis. 'HQ-Lt.3 Server Rm (Rack D4)'

  -- Kustodian
  custodian_group    text not null,                       -- IT Infra | Logistik | Produksi | HR & GA
  custodian_name     text not null,
  custodian_role     text,
  custodian_initials text,                                -- inisial avatar, mis. 'BR'

  -- Status operasional
  status             text not null default 'Tersedia'
                     check (status in ('Digunakan', 'Tersedia', 'Servis', 'Disposed')),

  -- Nilai & depresiasi (metode garis lurus / straight-line)
  acquisition_value  numeric(15, 2) not null default 0,   -- harga perolehan (Rp)
  residual_value     numeric(15, 2) not null default 0,   -- nilai residu (Rp)
  current_value      numeric(15, 2) not null default 0,   -- nilai buku saat ini (Rp)
  useful_life_months int  not null default 60,            -- masa manfaat (bulan)
  months_elapsed     int  not null default 0,             -- bulan berjalan
  po_number          text,                                -- nomor PO, mis. 'PO-8821'
  period_start       text,                                -- label bebas, mis. 'Nov 2023'
  period_end         text,                                -- label bebas, mis. 'Nov 2028'

  -- Spesifikasi & vendor
  vendor             text,
  warranty_until     date,
  meta_label         text default 'MAC Address',          -- label fleksibel (MAC / NOPOL / Tag)
  meta_value         text,
  hardware_spec      text,                                -- spesifikasi detail hardware

  -- Modul QR & foto
  qr_note            text,
  photo_icon         text default 'inventory_2',          -- nama Material Symbol
  photo_condition    text default 'Fisik Unit Terverifikasi',

  -- Baris kedua kolom Nilai/Depresiasi di tabel
  value_meta         text,

  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on table public.assets is 'Registri utama aset perusahaan (EAM).';

-- ----------------------------------------------------------------------------
-- 2. RIWAYAT MUTASI KUSTODIAN (audit log mini-timeline)
-- ----------------------------------------------------------------------------
create table if not exists public.asset_mutations (
  id         uuid primary key default gen_random_uuid(),
  asset_id   uuid not null references public.assets (id) on delete cascade,
  person     text not null,                               -- 'Nama • Departemen'
  note       text,                                        -- keterangan mutasi
  date_label text not null,                               -- label bebas, mis. '15 Jan 2024 - Sekarang (Aktif)'
  is_active  boolean not null default false,              -- penanda kustodian saat ini
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 3. INDEX
-- ----------------------------------------------------------------------------
create index if not exists idx_assets_status   on public.assets (status);
create index if not exists idx_assets_category on public.assets (category_key);
create index if not exists idx_assets_location on public.assets (location_key);
create index if not exists idx_assets_code     on public.assets (asset_code);
create index if not exists idx_mutations_asset on public.asset_mutations (asset_id);

-- ----------------------------------------------------------------------------
-- 4. TRIGGER updated_at
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_assets_updated_at on public.assets;
create trigger trg_assets_updated_at
  before update on public.assets
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (akses publik via anon key untuk demo)
-- ----------------------------------------------------------------------------
alter table public.assets          enable row level security;
alter table public.asset_mutations enable row level security;

drop policy if exists "Public read assets"   on public.assets;
drop policy if exists "Public insert assets" on public.assets;
drop policy if exists "Public update assets" on public.assets;
drop policy if exists "Public delete assets" on public.assets;

create policy "Public read assets"   on public.assets for select using (true);
create policy "Public insert assets" on public.assets for insert with check (true);
create policy "Public update assets" on public.assets for update using (true) with check (true);
create policy "Public delete assets" on public.assets for delete using (true);

drop policy if exists "Public read mutations"   on public.asset_mutations;
drop policy if exists "Public insert mutations" on public.asset_mutations;
drop policy if exists "Public update mutations" on public.asset_mutations;
drop policy if exists "Public delete mutations" on public.asset_mutations;

create policy "Public read mutations"   on public.asset_mutations for select using (true);
create policy "Public insert mutations" on public.asset_mutations for insert with check (true);
create policy "Public update mutations" on public.asset_mutations for update using (true) with check (true);
create policy "Public delete mutations" on public.asset_mutations for delete using (true);

-- ----------------------------------------------------------------------------
-- 6. SEED DATA — 5 aset sesuai desain referensi
-- ----------------------------------------------------------------------------
insert into public.assets (
  asset_code, full_id, name, short_name, specs,
  category_key, category_label, location_key, location_label,
  custodian_group, custodian_name, custodian_role, custodian_initials,
  status, acquisition_value, residual_value, current_value,
  useful_life_months, months_elapsed, po_number, period_start, period_end,
  vendor, warranty_until, meta_label, meta_value, hardware_spec,
  qr_note, photo_icon, photo_condition, value_meta
)
values
  (
    'AST-IT-0089', 'AST-2024-IT-0089',
    'Dell PowerEdge R750 Rack Server', 'Dell PowerEdge R750',
    'Dual Intel Xeon Silver 64-Core • 256GB ECC RAM • 8x 3.84TB SAS SSD',
    'IT Datacenter', 'IT Datacenter', 'HQ Jakarta', 'HQ-Lt.3 Server Rm (Rack D4)',
    'IT Infra', 'Budi Raharjo', 'IT Infrastructure', 'BR',
    'Digunakan', 145000000, 10000000, 108700000,
    60, 16, 'PO-8821', 'Nov 2023', 'Nov 2028',
    'PT Sistech Kharisma', '2026-11-18', 'MAC Address', '3C:52:82:11:9A:FF',
    '2x Intel Xeon 64-Core (2.4GHz Base), 256GB DDR4 ECC Registered, Dual redundant PSU 1400W Titanium, PERC H755 RAID Controller.',
    'Label QR terverifikasi enkripsi SHA-256. Cocok untuk scanner optik mobile dan fixed gate reader.',
    'dns', 'Fisik Unit Terverifikasi (Kondisi 98%)',
    'Depr: Rp 36.250.000'
  ),
  (
    'AST-VH-0012', 'AST-2023-VH-0012',
    'Toyota Hilux Double Cabin 2.4 DSL 4x4', 'Toyota Hilux 2.4 DSL 4x4',
    'Chassis: MHF21BB • Odo: 48.210 KM • Winch & Rollbar Kit Installed',
    'Kendaraan', 'Kendaraan Operasional', 'Pabrik Cikarang', 'Site Cikarang Plant I',
    'Logistik', 'Doni Setiawan', 'Logistik Fleet', 'DS',
    'Digunakan', 480000000, 48000000, 355200000,
    96, 22, 'PO-7104', 'Feb 2023', 'Feb 2031',
    'PT Astra International - Auto2000', '2027-05-12', 'Nomor Polisi', 'B 9182 KJA',
    'Diesel 2.4L 4x4 Manual, Double Cabin, Suspensi off-road upgrade, GPS Tracker aktif (Unit #GPS-2214).',
    'Label QR tahan cuaca terpasang pada kaca depan. Terbaca oleh gate reader pool logistik Cikarang.',
    'local_shipping', 'Fisik Unit Terverifikasi (Kondisi 92%)',
    'Servis: 12 Hari Lagi'
  ),
  (
    'AST-MC-0341', 'AST-2024-MC-0341',
    'CNC Vertical Milling Haas VF-2SS', 'CNC Haas VF-2SS',
    '12,000 RPM Spindle • 30+1 Side-Mount Tool Changer • Spindle Calib Error',
    'Mesin Pabrik', 'Mesin & Fabrikasi', 'Pabrik Cikarang', 'Bengkel Cikarang Bay-02',
    'Produksi', 'Agus Prasetyo', 'Kepala Fabrikasi', 'AP',
    'Servis', 890000000, 45000000, 612400000,
    120, 38, 'PO-5519', 'Nov 2021', 'Nov 2031',
    'PT Haas Automation Indonesia', '2025-09-30', 'Kontroler', 'HAAS NGC Next-Gen',
    'Spindle 12,000 RPM, Travel 762x406x508mm, 30+1 Side-Mount Tool Changer, Through-Spindle Coolant 300 PSI.',
    'Label QR industri terpasang pada badan mesin. Terhubung dengan work order perbaikan aktif.',
    'precision_manufacturing', 'Fisik Unit Terverifikasi (Kondisi 74%)',
    'WO #MNT-2024-041'
  ),
  (
    'AST-IT-0112', 'AST-2024-IT-0112',
    'Lenovo ThinkPad X1 Carbon Gen 11', 'Lenovo ThinkPad X1 Carbon',
    'Intel Core i7-1365U • 32GB LPDDR5 • 1TB NVMe PCIe 4.0 • Win 11 Pro',
    'Laptop & Gadget', 'Laptop Operasional', 'HQ Jakarta', 'HQ Jakarta Pool Lt. 2',
    'IT Infra', 'Pool Ready IT', 'Helpdesk Central', 'IT',
    'Tersedia', 34500000, 3400000, 24100000,
    48, 9, 'PO-9033', 'Des 2023', 'Des 2027',
    'PT Metrodata Electronics', '2027-08-22', 'MAC Address', '48:A4:72:0C:31:E2',
    'Intel Core i7-1365U vPro, 32GB LPDDR5-6400, 1TB NVMe PCIe Gen4, 14" WUXGA IPS Anti-glare, Windows 11 Pro.',
    'Label QR pada palm-rest terverifikasi. Unit siap deploy untuk karyawan baru atau pengganti rusak.',
    'laptop_mac', 'Fisik Unit Terverifikasi (Kondisi 100%)',
    'Ready to Deploy'
  ),
  (
    'AST-FN-0519', 'AST-2021-FN-0519',
    'Steelcase Modular Ergonomic Workstation', 'Steelcase Workstation',
    'Electric Height-Adjustable Dual Desk • Acoustic Privacy Screens',
    'Furniture', 'Furniture & Fixture', 'HQ Jakarta', 'HQ Jakarta Lt. 4 (HR Wing)',
    'HR & GA', 'Dewi Lestari', 'People Ops', 'HR',
    'Digunakan', 18200000, 900000, 7300000,
    96, 40, 'PO-4402', 'Agu 2021', 'Agu 2029',
    'PT Indachi Cipta Karya', '2029-12-31', 'Tag Aset Fisik', 'MOD-WS-04-19',
    'Electric height-adjustable (65-125cm), dual-surface 160x80cm, acoustic privacy screens, integrated cable tray.',
    'Tag QR laminasi terpasang pada bawah tabletop. Pemindaian terhubung ke data furniture & fixture.',
    'chair', 'Fisik Unit Terverifikasi (Kondisi 88%)',
    'Depr: Rp 10.920.000'
  )
on conflict (asset_code) do nothing;

-- ----------------------------------------------------------------------------
-- 7. SEED RIWAYAT MUTASI KUSTODIAN
-- ----------------------------------------------------------------------------
insert into public.asset_mutations (asset_id, person, note, date_label, is_active)
select a.id, v.person, v.note, v.date_label, v.is_active
from public.assets a
join (
  values
    ('AST-IT-0089', 'Budi Raharjo • IT Infrastructure', 'Penempatan Ruang Server Lt. 3 Datacenter HQ', '15 Jan 2024 - Sekarang (Aktif)', true),
    ('AST-IT-0089', 'Agnes Monica • Quality Assurance & Staging', 'Pemasangan Firmware & OS RedHat Enterprise 9', '20 Nov 2023 - 14 Jan 2024', false),
    ('AST-IT-0089', 'Bambang Wijaya • Receiving Warehouse', 'Serah terima vendor PT Sistech (Surat Jalan #SJ-7782)', '18 Nov 2023', false),
    ('AST-VH-0012', 'Doni Setiawan • Logistik Fleet', 'Penugasan operasional Site Cikarang Plant I', '01 Mar 2023 - Sekarang (Aktif)', true),
    ('AST-VH-0012', 'Pool Ready Logistik • Warehouse Margomulyo', 'Penerimaan unit & instalasi aksesori (winch, rollbar)', '10 Feb 2023 - 28 Feb 2023', false),
    ('AST-MC-0341', 'Agus Prasetyo • Kepala Fabrikasi', 'Penempatan Bengkel Cikarang Bay-02 (WO perbaikan spindle)', '02 Sep 2024 - Sekarang (Aktif)', true),
    ('AST-MC-0341', 'Tim Produksi Shift B • Pabrik Delta Mas', 'Operasi produksi batch komponen otomotif', '15 Jan 2022 - 01 Sep 2024', false),
    ('AST-MC-0341', 'Bambang Wijaya • Receiving Warehouse', 'Serah terima vendor PT Haas (Surat Jalan #SJ-3391)', '10 Nov 2021', false),
    ('AST-IT-0112', 'Pool Ready IT • Helpdesk Central', 'Penempatan di pool perangkat HQ Jakarta Lt. 2', '22 Des 2023 - Sekarang (Aktif)', true),
    ('AST-IT-0112', 'Bambang Wijaya • Receiving Warehouse', 'Serah terima vendor PT Metrodata (Surat Jalan #SJ-8122)', '18 Des 2023', false),
    ('AST-FN-0519', 'Dewi Lestari • People Ops', 'Penempatan HQ Jakarta Lt. 4 (HR Wing)', '01 Sep 2021 - Sekarang (Aktif)', true),
    ('AST-FN-0519', 'GA Facilities • General Affairs', 'Instalasi & konfigurasi workstation modular', '20 Agu 2021 - 31 Agu 2021', false)
) as v(asset_code, person, note, date_label, is_active)
  on v.asset_code = a.asset_code
where not exists (
  select 1
  from public.asset_mutations am
  where am.asset_id = a.id
    and am.person = v.person
    and am.date_label = v.date_label
);