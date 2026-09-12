import { useState } from 'react'
import Icon from '../ui/Icon'
import { statusBadge } from '../../data/katalogAset'

/**
 * Tabel inventaris padat (dense industrial table) + toolbar & pagination.
 */
export default function AssetTable({ rows, selectedId, onSelect, checkedIds, onToggleCheck, onToggleAll }) {
  const [page, setPage] = useState(1)
  const allChecked = rows.length > 0 && rows.every((row) => checkedIds.has(row.id))

  return (
    <div className="xl:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Table Top Toolbar */}
      <div className="p-space-md flex items-center justify-between bg-surface-container-low">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-primary font-bold">
            Daftar Inventaris Utama
          </span>
          <span className="px-space-xs py-0.5 bg-surface-container-highest text-on-surface font-data-code text-data-code rounded">
            Batch #2024-Q3
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <button className="p-1 text-on-surface-variant hover:bg-surface-container rounded" title="Pengaturan Kolom" type="button">
            <span className="material-symbols-outlined text-[20px]">view_column</span>
          </button>
          <button className="p-1 text-on-surface-variant hover:bg-surface-container rounded" title="Refresh Live Data" type="button">
            <span className="material-symbols-outlined text-[20px]">sync</span>
          </button>
          <button className="p-1 text-on-surface-variant hover:bg-surface-container rounded" title="Unduh Tampilan Ini" type="button">
            <span className="material-symbols-outlined text-[20px]">download</span>
          </button>
        </div>
      </div>

      {/* Dense Industrial Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-3 px-3 w-10 text-center">
                <input
                  checked={allChecked}
                  className="rounded text-primary-container focus:ring-0 cursor-pointer"
                  type="checkbox"
                  onChange={onToggleAll}
                />
              </th>
              <th className="py-3 px-3">Kode & QR</th>
              <th className="py-3 px-4">Nama & Spesifikasi Teknis</th>
              <th className="py-3 px-3">Kategori & Lokasi</th>
              <th className="py-3 px-3">Kustodian</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Nilai / Depresiasi</th>
              <th className="py-3 px-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface">
            {rows.map((asset) => {
              const isSelected = selectedId === asset.id
              const badge = statusBadge[asset.status]
              return (
                <tr
                  key={asset.id}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-surface-container/60 hover:bg-surface-container'
                      : 'hover:bg-surface-container-low'
                  }`}
                  onClick={() => onSelect(asset.id)}
                >
                  <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      checked={checkedIds.has(asset.id)}
                      className="rounded text-primary-container focus:ring-0 cursor-pointer"
                      type="checkbox"
                      onChange={() => onToggleCheck(asset.id)}
                    />
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-space-xs">
                      <div
                        className={`w-8 h-8 rounded flex items-center justify-center ${asset.qr.bg} ${asset.qr.text}`}
                      >
                        <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                      </div>
                      <div>
                        <span className="font-data-code text-data-code font-bold text-primary block">
                          {asset.code}
                        </span>
                        <span className="font-data-code text-[10px] text-on-surface-variant">
                          {asset.secondaryLabel}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-headline-sm text-[13px] font-semibold text-primary leading-snug">
                      {asset.name}
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-tight mt-0.5">
                      {asset.specs}
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface block">
                      {asset.categoryLabel}
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant flex items-center gap-0.5 mt-0.5">
                      <span className="material-symbols-outlined text-[13px] text-secondary">
                        pin_drop
                      </span>
                      {asset.location}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-label-sm text-[10px] font-bold ${asset.custodian.avatarClass}`}
                      >
                        {asset.custodian.initials}
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm font-medium block leading-none">
                          {asset.custodian.name}
                        </span>
                        <span className="font-body-sm text-[10px] text-on-surface-variant">
                          {asset.custodian.role}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-sm text-[11px] font-semibold ${badge.wrapper}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                      {asset.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="font-data-code text-data-code font-bold text-primary">
                      {asset.value}
                    </div>
                    <div className={`font-data-code text-[10px] ${asset.valueMetaClass}`}>
                      {asset.valueMeta}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="p-1 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="py-8 px-3 text-center font-body-sm text-body-sm text-on-surface-variant"
                >
                  Tidak ada aset yang cocok dengan kriteria pencarian/filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Table Controls */}
      <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Baris per halaman:
          </span>
          <select className="bg-surface-container-lowest text-on-surface text-body-sm px-2 py-1 rounded focus:outline-none">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="font-data-code text-data-code text-on-surface-variant ml-2">
            1 - {rows.length || 0} dari 4.820 aset
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface disabled:opacity-40"
            disabled={page === 1}
            type="button"
            onClick={() => setPage(1)}
          >
            <span className="material-symbols-outlined text-[18px]">first_page</span>
          </button>
          <button
            className="p-1.5 rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface disabled:opacity-40"
            disabled={page === 1}
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`px-3 py-1 rounded font-label-sm text-label-sm ${
                page === p
                  ? 'bg-primary-container text-on-primary font-bold'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
              type="button"
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <span className="px-1 text-on-surface-variant font-data-code text-data-code">...</span>
          <button
            className={`px-3 py-1 rounded font-label-sm text-label-sm ${
              page === 482
                ? 'bg-primary-container text-on-primary font-bold'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
            type="button"
            onClick={() => setPage(482)}
          >
            482
          </button>
          <button
            className="p-1.5 rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
            type="button"
            onClick={() => setPage((p) => Math.min(482, p + 1))}
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
          <button
            className="p-1.5 rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
            type="button"
            onClick={() => setPage(482)}
          >
            <span className="material-symbols-outlined text-[18px]">last_page</span>
          </button>
        </div>
      </div>
    </div>
  )
}