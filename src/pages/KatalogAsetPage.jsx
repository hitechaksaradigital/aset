import { useCallback, useEffect, useMemo, useState } from 'react'
import CatalogHeader from '../components/katalog/CatalogHeader'
import CatalogKpiCards from '../components/katalog/CatalogKpiCards'
import CatalogFilters from '../components/katalog/CatalogFilters'
import AssetTable from '../components/katalog/AssetTable'
import AssetInspector from '../components/katalog/AssetInspector'
import ScannerAssistant from '../components/katalog/ScannerAssistant'
import AssetFormModal from '../components/katalog/AssetFormModal'
import Icon from '../components/ui/Icon'
import { assets as mockAssets, filterOptions } from '../data/katalogAset'
import { fetchAssets, createAsset, formatMiliar } from '../services/assetService'

const findLabel = (options, value) => options.find((opt) => opt.value === value)?.label ?? value

export default function KatalogAsetPage() {
  // Data dari Supabase
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  // State filter multi-parameter
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [status, setStatus] = useState('')
  const [kustodian, setKustodian] = useState('')

  // State seleksi baris (inspector) & checkbox
  const [selectedId, setSelectedId] = useState(null)
  const [checkedIds, setCheckedIds] = useState(() => new Set())

  // State modal registrasi
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const loadAssets = useCallback(async () => {
    setLoading(true)
    setDbError(null)
    try {
      const data = await fetchAssets()
      setAssets(data)
      setUsingFallback(false)
      setSelectedId((prev) => prev ?? data[0]?.id ?? null)
    } catch (err) {
      console.error('Gagal memuat data aset dari Supabase:', err)
      setDbError(err.message || 'Terjadi kesalahan saat menghubungi Supabase.')
      setAssets(mockAssets)
      setUsingFallback(true)
      setSelectedId((prev) => prev ?? mockAssets[0]?.id ?? null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAssets()
  }, [loadAssets])

  const filteredAssets = useMemo(() => {
    const query = search.trim().toLowerCase()
    return assets.filter((asset) => {
      const matchSearch =
        !query ||
        [asset.code, asset.secondaryLabel, asset.name, asset.specs]
          .join(' ')
          .toLowerCase()
          .includes(query)
      const matchKategori = !kategori || asset.categoryKey === kategori
      const matchLokasi = !lokasi || asset.locationKey === lokasi
      const matchStatus = !status || asset.status === status
      const matchKustodian = !kustodian || asset.custodianKey === kustodian
      return matchSearch && matchKategori && matchLokasi && matchStatus && matchKustodian
    })
  }, [assets, search, kategori, lokasi, status, kustodian])

  const activeFilters = useMemo(() => {
    const filters = []
    if (search.trim())
      filters.push({
        key: 'search',
        label: `Pencarian: "${search.trim()}"`,
        clear: () => setSearch(''),
      })
    if (kategori)
      filters.push({
        key: 'kategori',
        label: `Kategori: ${findLabel(filterOptions.kategori, kategori)}`,
        clear: () => setKategori(''),
      })
    if (lokasi)
      filters.push({
        key: 'lokasi',
        label: `Site: ${findLabel(filterOptions.lokasi, lokasi)}`,
        clear: () => setLokasi(''),
      })
    if (status)
      filters.push({
        key: 'status',
        label: `Status: ${findLabel(filterOptions.status, status)}`,
        clear: () => setStatus(''),
      })
    if (kustodian)
      filters.push({
        key: 'kustodian',
        label: `Kustodian: ${findLabel(filterOptions.kustodian, kustodian)}`,
        clear: () => setKustodian(''),
      })
    return filters
  }, [search, kategori, lokasi, status, kustodian])

  // KPI dihitung langsung dari data database
  const kpis = useMemo(() => {
    const total = assets.length
    const active = assets.filter((a) => a.status === 'Digunakan').length
    const servis = assets.filter((a) => a.status === 'Servis').length
    const sumCurrent = assets.reduce((sum, a) => sum + (a._raw?.current ?? 0), 0)
    const sumAcquisition = assets.reduce((sum, a) => sum + (a._raw?.acquisition ?? 0), 0)
    const activePct = total ? (active / total) * 100 : 0
    const deprPct = sumAcquisition > 0 ? (1 - sumCurrent / sumAcquisition) * 100 : 0
    const now = new Date()
    const newThisMonth = assets.filter((a) => {
      const created = a._raw?.createdAt ? new Date(a._raw.createdAt) : null
      return (
        created &&
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      )
    }).length

    return [
      {
        label: 'Total Aset Terdaftar',
        icon: 'layers',
        iconClass: 'text-secondary',
        value: total.toLocaleString('id-ID'),
        badge: {
          text: `+${newThisMonth} bln ini`,
          class: 'bg-surface-container text-on-secondary-container',
          mono: true,
        },
        bar: { width: '88%', color: 'bg-secondary-container' },
      },
      {
        label: 'Aktif Digunakan',
        icon: 'verified',
        iconClass: 'text-on-tertiary-container',
        value: active.toLocaleString('id-ID'),
        badge: {
          text: `${activePct.toFixed(1)}%`,
          class: 'bg-surface-container-lowest text-on-tertiary-container',
          mono: true,
        },
        bar: { width: `${activePct}%`, color: 'bg-tertiary-fixed-dim' },
      },
      {
        label: 'Nilai Buku Portofolio',
        icon: 'account_balance',
        iconClass: 'text-secondary',
        value: formatMiliar(sumCurrent),
        badge: { text: `Depr. Acc. ${deprPct.toFixed(0)}%`, class: '', mono: false, plain: true },
        bar: { width: '78%', color: 'bg-secondary' },
      },
      {
        label: 'Dalam Antrian Servis/SLA',
        icon: 'build_circle',
        iconClass: 'text-error',
        value: `${servis} Unit`,
        badge: {
          text: `${servis} Urgent`,
          class: 'bg-error-container text-on-error-container',
          mono: false,
        },
        bar: { width: `${total ? (servis / total) * 100 : 0}%`, color: 'bg-error' },
      },
    ]
  }, [assets])

  const resetFilters = () => {
    setSearch('')
    setKategori('')
    setLokasi('')
    setStatus('')
    setKustodian('')
  }

  const handleToggleCheck = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleToggleAll = () => {
    setCheckedIds((prev) => {
      const allChecked = filteredAssets.length > 0 && filteredAssets.every((a) => prev.has(a.id))
      if (allChecked) return new Set()
      return new Set(filteredAssets.map((a) => a.id))
    })
  }

  const handleCreateAsset = async (form) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const created = await createAsset(form)
      setShowForm(false)
      await loadAssets()
      setSelectedId(created.id)
      setCheckedIds((prev) => new Set(prev).add(created.id))
    } catch (err) {
      console.error('Gagal menyimpan aset:', err)
      setSubmitError(err.message || 'Gagal menyimpan aset ke Supabase.')
    } finally {
      setSubmitting(false)
    }
  }

  const selectedAsset = assets.find((asset) => asset.id === selectedId) ?? null

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* TOP CONTEXT BANNER & OPERATIONAL METRICS */}
      <CatalogHeader onRegister={() => setShowForm(true)} />

      {/* Status koneksi database */}
      {usingFallback && (
        <div className="bg-error-container text-on-error-container p-space-md rounded-xl flex items-start gap-space-sm">
          <Icon name="cloud_off" className="text-[20px] mt-0.5" />
          <div className="font-body-sm text-body-sm">
            <span className="font-semibold">Tidak dapat terhubung ke Supabase</span> — menampilkan
            data contoh. Pastikan skema <code className="font-data-code">supabase/schema.sql</code>{' '}
            sudah dijalankan di SQL Editor. Detail: {dbError}
          </div>
        </div>
      )}

      {/* KPI TELEMETRY SUMMARY */}
      <CatalogKpiCards kpis={kpis} />

      {/* SEARCH & MULTI-PARAMETER FILTER BAR */}
      <CatalogFilters
        search={search}
        onSearchChange={setSearch}
        kategori={kategori}
        onKategoriChange={setKategori}
        lokasi={lokasi}
        onLokasiChange={setLokasi}
        status={status}
        onStatusChange={setStatus}
        kustodian={kustodian}
        onKustodianChange={setKustodian}
        activeFilters={activeFilters}
        onReset={resetFilters}
        visibleCount={filteredAssets.length}
        totalCount={assets.length}
      />

      {/* MAIN WORKSPACE: SPLIT-VIEW (DATA GRID + ASSET INSPECTOR DRAWER) */}
      {loading ? (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-xl flex flex-col items-center justify-center gap-space-sm min-h-[40vh]">
          <span className="material-symbols-outlined text-[36px] text-secondary animate-spin">
            progress_activity
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant">
            Memuat data aset dari Supabase...
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          {/* LEFT/CENTER: ASSET DATA TABLE (8 COLS) */}
          <AssetTable
            rows={filteredAssets}
            total={assets.length}
            selectedId={selectedId}
            onSelect={setSelectedId}
            checkedIds={checkedIds}
            onToggleCheck={handleToggleCheck}
            onToggleAll={handleToggleAll}
          />

          {/* RIGHT: DEDICATED ASSET INSPECTOR DRAWER / PREVIEW PANEL (4 COLS) */}
          <div className="xl:col-span-4 flex flex-col gap-space-md">
            <AssetInspector asset={selectedAsset} />
            <ScannerAssistant />
          </div>
        </div>
      )}

      {/* Modal registrasi aset baru */}
      <AssetFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleCreateAsset}
        submitting={submitting}
        submitError={submitError}
      />
    </div>
  )
}