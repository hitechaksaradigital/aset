import { supabase } from '../lib/supabase'

// ---------------------------------------------------------------------------
// Helper format & derivasi tampilan
// ---------------------------------------------------------------------------

export const formatRupiah = (value) => `Rp ${Number(value || 0).toLocaleString('id-ID')}`

const formatJuta = (value) =>
  `Rp ${(Number(value || 0) / 1e6).toLocaleString('id-ID', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}M`

const formatMiliar = (value) =>
  `Rp ${(Number(value || 0) / 1e9).toLocaleString('id-ID', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} M`

export const formatDateId = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const initialsOf = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('') || 'AS'

const avatarClassMap = {
  'IT Infra': 'bg-primary-container text-on-primary',
  Logistik: 'bg-secondary text-on-secondary',
  Produksi: 'bg-surface-tint text-on-primary',
  'HR & GA': 'bg-surface-container-high text-on-surface',
}

const statusDetailMap = {
  Digunakan: {
    statusLabel: 'Aktif Digunakan',
    statusClass: 'bg-surface-container-high text-on-tertiary-container',
    statusDot: 'bg-on-tertiary-container',
  },
  Tersedia: {
    statusLabel: 'Tersedia (Ready Pool)',
    statusClass: 'bg-secondary-fixed text-on-secondary-fixed',
    statusDot: 'bg-secondary',
  },
  Servis: {
    statusLabel: 'Dalam Servis',
    statusClass: 'bg-error-container text-on-error-container',
    statusDot: 'bg-error animate-ping',
  },
  Disposed: {
    statusLabel: 'Pelepasan (Disposed)',
    statusClass: 'bg-surface-container-highest text-on-surface-variant',
    statusDot: 'bg-outline',
  },
}

const valueMetaTone = (meta = '') => {
  if (meta.startsWith('WO')) return 'text-error font-medium'
  if (meta.startsWith('Servis')) return 'text-secondary'
  if (meta.startsWith('Ready')) return 'text-on-tertiary-container'
  return 'text-on-surface-variant'
}

const categoryPrefixMap = {
  'IT Datacenter': 'IT',
  Kendaraan: 'VH',
  'Mesin Pabrik': 'MC',
  'Laptop & Gadget': 'IT',
  Furniture: 'FN',
}

// ---------------------------------------------------------------------------
// Mapping row Supabase -> bentuk yang dikonsumsi komponen UI
// ---------------------------------------------------------------------------

export function mapAsset(row, mutations = []) {
  const progress = row.useful_life_months
    ? Math.min(100, (Number(row.months_elapsed) / Number(row.useful_life_months)) * 100)
    : 0
  const warrantyExpired = row.warranty_until ? new Date(row.warranty_until) < new Date() : false
  const sortedMutations = [...mutations].sort(
    (a, b) => Number(b.is_active) - Number(a.is_active) || new Date(b.created_at) - new Date(a.created_at),
  )

  return {
    dbId: row.id,
    id: row.full_id,
    code: row.asset_code,
    secondaryLabel: row.secondary_label || (row.serial_number ? `SN: ${row.serial_number}` : '-'),
    qr: {
      bg: 'bg-surface-container-low',
      text: row.status === 'Servis' ? 'text-error' : 'text-secondary',
    },
    name: row.name,
    shortName: row.short_name || row.name,
    specs: row.specs || '-',
    categoryKey: row.category_key,
    categoryLabel: row.category_label,
    locationKey: row.location_key,
    location: row.location_label,
    custodianKey: row.custodian_group,
    custodian: {
      initials: row.custodian_initials || initialsOf(row.custodian_name),
      avatarClass: avatarClassMap[row.custodian_group] ?? 'bg-surface-container-high text-on-surface',
      name: row.custodian_name,
      role: row.custodian_role || '-',
    },
    status: row.status,
    value: formatRupiah(row.acquisition_value),
    valueMeta: row.value_meta || '',
    valueMetaClass: valueMetaTone(row.value_meta || ''),
    photo: {
      icon: row.photo_icon || 'inventory_2',
      condition: row.photo_condition || 'Fisik Unit Terverifikasi',
    },
    // Nilai mentah untuk kalkulasi KPI
    _raw: {
      acquisition: Number(row.acquisition_value) || 0,
      residual: Number(row.residual_value) || 0,
      current: Number(row.current_value) || 0,
      createdAt: row.created_at,
    },
    detail: {
      ...(statusDetailMap[row.status] ?? statusDetailMap.Tersedia),
      qrNote: row.qr_note || 'Label QR terverifikasi dan siap dipindai oleh scanner optik.',
      specs: {
        vendor: row.vendor || '-',
        warranty: row.warranty_until ? `s/d ${formatDateId(row.warranty_until)}` : '-',
        warrantyClass: warrantyExpired ? 'text-error' : 'text-on-tertiary-container',
        serial: row.serial_number || row.asset_code,
        metaLabel: row.meta_label || 'MAC Address',
        metaValue: row.meta_value || '-',
        hardware: row.hardware_spec || '-',
      },
      depreciation: {
        acquisition: formatJuta(row.acquisition_value),
        residual: formatJuta(row.residual_value),
        current: formatJuta(row.current_value),
        life: `Masa Manfaat: ${Math.round(Number(row.useful_life_months) / 12)} Tahun (${row.useful_life_months} Bulan)`,
        elapsed: `Bulan ke-${row.months_elapsed} (${progress.toFixed(1)}%)`,
        progress,
        start: row.period_start
          ? `${row.period_start}${row.po_number ? ` (PO: #${row.po_number})` : ''}`
          : '-',
        end: row.period_end ? `${row.period_end} (End of Life)` : '-',
      },
      mutations: sortedMutations.map((m) => ({
        active: m.is_active,
        person: m.person,
        note: m.note || '',
        date: m.date_label,
      })),
    },
  }
}

// ---------------------------------------------------------------------------
// Service: fetch & create
// ---------------------------------------------------------------------------

/**
 * Mengambil seluruh aset + riwayat mutasinya dari Supabase.
 */
export async function fetchAssets() {
  if (!supabase) {
    throw new Error('Konfigurasi Supabase belum tersedia (periksa VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY).')
  }

  const [assetsRes, mutationsRes] = await Promise.all([
    supabase.from('assets').select('*').order('created_at', { ascending: true }),
    supabase.from('asset_mutations').select('*').order('created_at', { ascending: true }),
  ])

  if (assetsRes.error) throw assetsRes.error
  if (mutationsRes.error) throw mutationsRes.error

  const mutationsByAsset = new Map()
  for (const mutation of mutationsRes.data || []) {
    if (!mutationsByAsset.has(mutation.asset_id)) mutationsByAsset.set(mutation.asset_id, [])
    mutationsByAsset.get(mutation.asset_id).push(mutation)
  }

  return (assetsRes.data || []).map((row) => mapAsset(row, mutationsByAsset.get(row.id) || []))
}

/**
 * Mendaftarkan aset baru ke Supabase (tabel assets + mutasi awal).
 */
export async function createAsset(form) {
  if (!supabase) throw new Error('Konfigurasi Supabase belum tersedia.')

  const now = new Date()
  const year = now.getFullYear()
  const prefix = categoryPrefixMap[form.categoryKey] ?? 'AST'
  const seq = String(Math.floor(1000 + Math.random() * 9000))
  const code = (form.assetCode || '').trim() || `AST-${prefix}-${seq}`
  const fullId = /^AST-/i.test(code) ? `AST-${year}-${code.replace(/^AST-/i, '')}` : code

  const acquisition = Number(form.acquisitionValue) || 0
  const residual = Number(form.residualValue) || 0
  const lifeMonths = Number(form.usefulLifeMonths) || 60
  const elapsed = Number(form.monthsElapsed) || 0
  const monthlyDepreciation = lifeMonths > 0 ? (acquisition - residual) / lifeMonths : 0
  const currentValue =
    form.currentValue !== undefined && form.currentValue !== ''
      ? Number(form.currentValue)
      : Math.max(residual, acquisition - monthlyDepreciation * elapsed)

  const payload = {
    asset_code: code,
    full_id: fullId,
    name: form.name.trim(),
    short_name: form.shortName?.trim() || form.name.trim(),
    specs: form.specs?.trim() || null,
    category_key: form.categoryKey,
    category_label: form.categoryLabel,
    location_key: form.locationKey,
    location_label: form.locationLabel,
    custodian_group: form.custodianGroup,
    custodian_name: form.custodianName.trim(),
    custodian_role: form.custodianRole?.trim() || null,
    custodian_initials: initialsOf(form.custodianName),
    status: form.status,
    acquisition_value: acquisition,
    residual_value: residual,
    current_value: currentValue,
    useful_life_months: lifeMonths,
    months_elapsed: elapsed,
    po_number: form.poNumber?.trim() || null,
    period_start: form.periodStart?.trim() || null,
    period_end: form.periodEnd?.trim() || null,
    vendor: form.vendor?.trim() || null,
    warranty_until: form.warrantyUntil || null,
    meta_label: form.metaLabel?.trim() || 'MAC Address',
    meta_value: form.metaValue?.trim() || null,
    hardware_spec: form.hardwareSpec?.trim() || null,
    qr_note: form.qrNote?.trim() || null,
    photo_icon: form.photoIcon || 'inventory_2',
    photo_condition: form.photoCondition?.trim() || 'Fisik Unit Terverifikasi',
    value_meta:
      form.valueMeta?.trim() ||
      (acquisition > 0 ? `Depr: ${formatRupiah(Math.max(0, acquisition - currentValue))}` : null),
  }

  const { data, error } = await supabase.from('assets').insert(payload).select().single()
  if (error) throw error

  const monthYear = now.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
  const initialMutation = {
    asset_id: data.id,
    person: `${payload.custodian_name}${payload.custodian_role ? ` • ${payload.custodian_role}` : ''}`,
    note: 'Registrasi awal aset',
    date_label: `${monthYear} - Sekarang (Aktif)`,
    is_active: true,
  }
  const { error: mutationError } = await supabase.from('asset_mutations').insert(initialMutation)
  if (mutationError) throw mutationError

  return mapAsset(data, [initialMutation])
}

export { formatMiliar }