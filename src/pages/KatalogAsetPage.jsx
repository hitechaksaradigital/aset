import { useMemo, useState } from 'react'
import CatalogHeader from '../components/katalog/CatalogHeader'
import CatalogKpiCards from '../components/katalog/CatalogKpiCards'
import CatalogFilters from '../components/katalog/CatalogFilters'
import AssetTable from '../components/katalog/AssetTable'
import AssetInspector from '../components/katalog/AssetInspector'
import ScannerAssistant from '../components/katalog/ScannerAssistant'
import { assets, filterOptions } from '../data/katalogAset'

const findLabel = (options, value) => options.find((opt) => opt.value === value)?.label ?? value

export default function KatalogAsetPage() {
  // State filter multi-parameter
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [status, setStatus] = useState('')
  const [kustodian, setKustodian] = useState('')

  // State seleksi baris (inspector) & checkbox
  const [selectedId, setSelectedId] = useState('AST-2024-IT-0089')
  const [checkedIds, setCheckedIds] = useState(() => new Set(['AST-2024-IT-0089']))

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
  }, [search, kategori, lokasi, status, kustodian])

  const activeFilters = useMemo(() => {
    const filters = []
    if (search.trim())
      filters.push({ key: 'search', label: `Pencarian: "${search.trim()}"`, clear: () => setSearch('') })
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

  const selectedAsset = assets.find((asset) => asset.id === selectedId) ?? null

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* TOP CONTEXT BANNER & OPERATIONAL METRICS */}
      <CatalogHeader />

      {/* KPI TELEMETRY SUMMARY */}
      <CatalogKpiCards />

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
      />

      {/* MAIN WORKSPACE: SPLIT-VIEW (DATA GRID + ASSET INSPECTOR DRAWER) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* LEFT/CENTER: ASSET DATA TABLE (8 COLS) */}
        <AssetTable
          rows={filteredAssets}
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
    </div>
  )
}