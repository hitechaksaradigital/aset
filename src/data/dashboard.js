/**
 * Data mock untuk Dashboard Eksekutif AssetIQ Enterprise EAM.
 * Seluruh konten mengikuti desain referensi
 * design/dashboard_eksekutif_pelaporan_nilai_aset/code.html
 */

export const navSections = [
  {
    title: 'Ikhtisar Utama',
    items: [
      { id: 'dashboard-dan-analitik', label: 'Dashboard & Analitik', icon: 'dashboard', path: '/' },
    ],
  },
  {
    title: 'Pendataan & Registri',
    items: [
      { id: 'katalog-dan-inventaris', label: 'Katalog Aset', icon: 'inventory_2', path: '/katalog-aset' },
      { id: 'scanner-qr-barcode', label: 'Scanner QR / Barcode', icon: 'qr_code_scanner', path: '/scanner-qr-barcode' },
      { id: 'kategori-dan-lokasi', label: 'Kategori & Lokasi', icon: 'hub', path: '/kategori-dan-lokasi' },
    ],
  },
  {
    title: 'Operasional',
    items: [
      { id: 'pemeliharaan-dan-tiket', label: 'Pemeliharaan & SLA', icon: 'build_circle', path: '/pemeliharaan-dan-tiket' },
      { id: 'transaksi-peminjaman', label: 'Peminjaman (Check-in/Out)', icon: 'sync_alt', path: '/transaksi-peminjaman' },
      { id: 'pelepasan-aset', label: 'Pelepasan Aset (Disposal)', icon: 'delete_sweep', path: '/pelepasan-aset' },
    ],
  },
  {
    title: 'Kepatuhan & Sistem',
    items: [
      { id: 'transaksi-dan-audit-log', label: 'Laporan Audit Trail', icon: 'verified', path: '/laporan-audit-trail' },
      { id: 'log-aktivitas', label: 'Log Aktivitas', icon: 'history', path: '/log-aktivitas' },
      { id: 'pengaturan-rbac', label: 'Pengaturan RBAC', icon: 'admin_panel_settings', path: '/pengaturan-rbac' },
    ],
  },
]

export const periodeOptions = [
  { value: 'ytd', label: 'YTD (Tahun Berjalan 2024)' },
  { value: 'q3', label: 'Kuartal III (Q3 2024)' },
  { value: 'q2', label: 'Kuartal II (Q2 2024)' },
  { value: 'fy23', label: 'Tahun Fiskal 2023' },
]

export const exportOptions = [
  { id: 'pdf', label: 'PDF Eksekutif (.pdf)', icon: 'picture_as_pdf', iconClass: 'text-error' },
  {
    id: 'xlsx',
    label: 'Microsoft Excel (.xlsx)',
    icon: 'table_view',
    iconClass: 'text-on-tertiary-container',
  },
  { id: 'csv', label: 'Raw Dataset (.csv)', icon: 'data_object', iconClass: 'text-secondary' },
]

export const assetStatus = {
  activeCount: '3.410',
  activeLabel: 'Aktif Digunakan (70.7%)',
  segments: [
    { label: 'Digunakan', value: 70.7, color: 'bg-primary-container' },
    { label: 'Tersedia', value: 18.5, color: 'bg-secondary-container' },
    { label: 'Perbaikan', value: 7.0, color: 'bg-on-tertiary-container' },
    { label: 'Disposed', value: 3.8, color: 'bg-error' },
  ],
  summary: [
    { label: 'Stok', value: '890' },
    { label: 'Rpk', value: '340' },
    { label: 'Disp', value: '180' },
  ],
}

export const allocationSegments = [
  {
    label: 'IT & Komputasi',
    value: 38,
    amount: 'Rp 32,1 M',
    color: '#123B6D',
    textClass: 'text-primary-container',
  },
  {
    label: 'Fasilitas & Properti',
    value: 28,
    amount: 'Rp 23,7 M',
    color: '#08968d',
    textClass: 'text-on-tertiary-container',
  },
  {
    label: 'Alat Berat & Mesin',
    value: 22,
    amount: 'Rp 18,6 M',
    color: '#33598F',
    textClass: 'text-secondary',
  },
  {
    label: 'Kendaraan Dinas',
    value: 12,
    amount: 'Rp 10,2 M',
    color: '#AFC6E3',
    textClass: 'text-on-secondary-container',
  },
]

export const alertRows = [
  {
    id: 'AST-SRV-2022-098',
    serial: 'DL380-9941',
    name: 'Server Rack DC Alpha #04',
    icon: 'dns',
    category: 'Pusat Data Utama',
    location: 'Gedung Cyber Lt. 3',
    deadline: 'Garansi: 3 Hari Lagi',
    deadlineTone: 'critical',
    deadlineMeta: 'Vendor: HPE Indonesia',
    custodian: 'Rian Pratama',
    custodianRole: 'Infrastructure Lead',
    urgency: 'Tinggi',
    action: 'Buat Tiket',
    actionIcon: 'confirmation_number',
    actionTone: 'primary',
  },
  {
    id: 'AST-LOG-2021-042',
    serial: 'KMTS-88421',
    name: 'Forklift Komatsu FD30T-17',
    icon: 'forklift',
    category: 'Logistik & Gudang',
    location: 'Hub Cikarang Barat',
    deadline: 'PM Berkala (500 Jam)',
    deadlineTone: 'teal',
    deadlineMeta: 'Jadwal: 4 Hari Lagi',
    custodian: 'Agus Hariyadi',
    custodianRole: 'Fleet Supervisor',
    urgency: 'Sedang',
    action: 'Jadwalkan',
    actionIcon: 'calendar_add_on',
    actionTone: 'secondary',
  },
  {
    id: 'AST-DEV-2023-119',
    serial: 'C02GM09AQ',
    name: 'MacBook Pro M2 Max (Creative Hub)',
    icon: 'laptop_mac',
    category: 'Creative & Marketing',
    location: 'Head Office Lt. 12',
    deadline: 'Lisensi Enterprise: 5 Hari',
    deadlineTone: 'critical',
    deadlineMeta: 'Adobe Creative Cloud',
    custodian: 'Siti Nadira',
    custodianRole: 'Sr. Art Director',
    urgency: 'Tinggi',
    action: 'Perpanjang',
    actionIcon: 'sync',
    actionTone: 'primary',
  },
  {
    id: 'AST-FAC-2019-011',
    serial: 'DK-CH-44912',
    name: 'Chiller Central Daikin 150TR',
    icon: 'hvac',
    category: 'Building Management',
    location: 'Rooftop Tower A',
    deadline: 'Sertifikasi Kalibrasi: 7 Hari',
    deadlineTone: 'neutral',
    deadlineMeta: 'Audit Disnaker',
    custodian: 'Bambang Wijaya',
    custodianRole: 'Facility Engineering',
    urgency: 'Sedang',
    action: 'Verifikasi',
    actionIcon: 'verified',
    actionTone: 'secondary',
  },
]

export const quickActions = [
  { id: 'checkin-out', label: 'Check-in / Out Kilat', icon: 'sync_alt' },
  { id: 'barcode', label: 'Cetak Batch Barcode', icon: 'print' },
  { id: 'opname', label: 'Audit Stock Opname', icon: 'inventory', tone: 'primary' },
]