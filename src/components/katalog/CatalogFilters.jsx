import Icon from '../ui/Icon'
import { filterOptions } from '../../data/katalogAset'

/**
 * Search & multi-parameter filter bar dengan tag filter aktif.
 */
export default function CatalogFilters({
  search,
  onSearchChange,
  kategori,
  onKategoriChange,
  lokasi,
  onLokasiChange,
  status,
  onStatusChange,
  kustodian,
  onKustodianChange,
  activeFilters,
  onReset,
  visibleCount,
  totalCount,
}) {
  const selectClass =
    'w-full h-10 px-3 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none cursor-pointer'

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm">
        {/* Keyword / Serial Search */}
        <div className="md:col-span-4 relative flex items-center">
          <Icon name="search" className="absolute left-3 text-outline text-[20px]" />
          <input
            className="w-full h-10 pl-10 pr-4 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:bg-surface-container-lowest transition-all"
            id="filter-search"
            placeholder="Cari Kode AST, Serial Number, Nama Mesin/Laptop..."
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Kategori Filter */}
        <div className="md:col-span-2">
          <select
            className={selectClass}
            value={kategori}
            onChange={(e) => onKategoriChange(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {filterOptions.kategori.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Lokasi Filter */}
        <div className="md:col-span-2">
          <select
            className={selectClass}
            value={lokasi}
            onChange={(e) => onLokasiChange(e.target.value)}
          >
            <option value="">Semua Lokasi Site</option>
            {filterOptions.lokasi.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-2">
          <select
            className={selectClass}
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">Semua Status Operasional</option>
            {filterOptions.status.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Penanggung Jawab / Custodian */}
        <div className="md:col-span-2">
          <select
            className={selectClass}
            value={kustodian}
            onChange={(e) => onKustodianChange(e.target.value)}
          >
            <option value="">Semua Kustodian</option>
            {filterOptions.kustodian.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Tags Row */}
      <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
        <span className="font-label-sm text-label-sm text-on-surface-variant mr-1">
          Filter Aktif:
        </span>
        {activeFilters.length === 0 ? (
          <span className="font-data-code text-data-code text-outline">Tidak ada filter aktif</span>
        ) : (
          activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-high rounded text-on-surface font-data-code text-data-code"
            >
              {filter.label}
              <button className="hover:text-error ml-1" type="button" onClick={filter.clear}>
                ×
              </button>
            </span>
          ))
        )}
        <button
          className="font-label-sm text-label-sm text-secondary hover:text-primary underline ml-2"
          type="button"
          onClick={onReset}
        >
          Reset Semua
        </button>
        <span className="ml-auto font-data-code text-data-code text-on-surface-variant">
          Menampilkan {visibleCount} dari {totalCount} baris terverifikasi
        </span>
      </div>
    </div>
  )
}