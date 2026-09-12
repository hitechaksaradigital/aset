import { useState } from 'react'
import Icon from '../ui/Icon'
import { alertRows } from '../../data/dashboard'

const deadlineToneClass = {
  critical: 'text-error',
  teal: 'text-on-tertiary-container',
  neutral: 'text-on-surface',
}

const urgencyBadge = {
  Tinggi: {
    wrapper: 'bg-error-container text-on-error-container',
    dot: 'bg-error',
  },
  Sedang: {
    wrapper: 'bg-surface-container-high text-on-primary-container',
    dot: 'bg-secondary',
  },
}

const actionButton = {
  primary:
    'bg-primary-container text-on-primary hover:bg-primary shadow-sm',
  secondary:
    'bg-surface-container hover:bg-surface-container-high text-primary-container',
}

export default function AlertsTable() {
  const [filter, setFilter] = useState('all')

  const criticalCount = alertRows.filter((row) => row.urgency === 'Tinggi').length
  const visibleRows = filter === 'critical' ? alertRows.filter((row) => row.urgency === 'Tinggi') : alertRows

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <Icon name="notification_important" className="text-error text-[20px]" />
            <h2 className="font-headline-sm text-headline-sm text-primary-container font-bold">
              Peringatan Jatuh Tempo Garansi & Preventive Maintenance
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Daftar aset prioritas tinggi yang memerlukan tindakan dalam 7 hari kalender ke depan.
          </p>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Filter Prioritas:
          </span>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-space-xs py-0.5 font-label-sm text-label-sm rounded font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-error-container text-on-error-container'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Semua ({alertRows.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('critical')}
            className={`px-space-xs py-0.5 font-label-sm text-label-sm rounded font-semibold transition-colors ${
              filter === 'critical'
                ? 'bg-error-container text-on-error-container'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Kritis Saja ({criticalCount})
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-2.5 px-space-sm rounded-l-lg">ID & Nama Aset</th>
              <th className="py-2.5 px-space-sm">Kategori / Lokasi</th>
              <th className="py-2.5 px-space-sm">Batas Waktu</th>
              <th className="py-2.5 px-space-sm">Custodian</th>
              <th className="py-2.5 px-space-sm">Tingkat Urgensi</th>
              <th className="py-2.5 px-space-sm text-right rounded-r-lg">Aksi Operasional</th>
            </tr>
          </thead>
          <tbody className="divide-y-0">
            {visibleRows.map((row) => {
              const badge = urgencyBadge[row.urgency]
              return (
                <tr key={row.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="py-3 px-space-sm">
                    <div className="flex items-center gap-space-xs">
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary-container">
                        <Icon name={row.icon} className="text-[18px]" />
                      </div>
                      <div>
                        <div className="font-body-md text-body-md font-semibold text-primary-container">
                          {row.name}
                        </div>
                        <div className="font-data-code text-label-sm text-on-surface-variant">
                          {row.id} • S/N: {row.serial}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-space-sm">
                    <div className="font-body-sm text-body-sm text-on-surface">{row.category}</div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                      {row.location}
                    </div>
                  </td>
                  <td className="py-3 px-space-sm">
                    <span
                      className={`font-data-code text-body-sm font-semibold ${deadlineToneClass[row.deadlineTone]}`}
                    >
                      {row.deadline}
                    </span>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                      {row.deadlineMeta}
                    </div>
                  </td>
                  <td className="py-3 px-space-sm">
                    <div className="font-body-sm text-body-sm font-medium text-on-surface">
                      {row.custodian}
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                      {row.custodianRole}
                    </div>
                  </td>
                  <td className="py-3 px-space-sm">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold ${badge.wrapper}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>{' '}
                      {row.urgency === 'Tinggi' ? 'Prioritas Tinggi' : row.urgency}
                    </span>
                  </td>
                  <td className="py-3 px-space-sm text-right">
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1 px-space-sm py-1 rounded font-label-sm text-label-sm transition-colors ${actionButton[row.actionTone]}`}
                    >
                      <Icon name={row.actionIcon} className="text-[14px]" />
                      <span>{row.action}</span>
                    </button>
                  </td>
                </tr>
              )
            })}
            {visibleRows.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-6 px-space-sm text-center font-body-sm text-body-sm text-on-surface-variant"
                >
                  Tidak ada aset yang cocok dengan filter prioritas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}