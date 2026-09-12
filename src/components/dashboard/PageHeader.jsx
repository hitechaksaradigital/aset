import { useEffect, useRef, useState } from 'react'
import Icon from '../ui/Icon'
import { periodeOptions, exportOptions } from '../../data/dashboard'

export default function PageHeader() {
  const [periode, setPeriode] = useState('q3')
  const [exportOpen, setExportOpen] = useState(false)
  const exportRef = useRef(null)

  // Tutup dropdown ekspor saat klik di luar area
  useEffect(() => {
    const handler = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setExportOpen(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const handleExport = (option) => {
    console.log('Ekspor laporan:', option.label)
    setExportOpen(false)
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
      <div className="flex flex-col gap-space-xs max-w-3xl">
        <div className="flex items-center gap-space-xs">
          <span className="px-space-xs py-0.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded uppercase tracking-wider">
            Enterprise Intelligence
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
          <span className="font-data-code text-data-code text-on-tertiary-container font-semibold">
            Telemetri Realtime Terverifikasi
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary-container font-bold tracking-tight">
          Dashboard Eksekutif & Ringkasan Aset Perusahaan
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Pemantauan status 4.820 aset aktif, depresiasi berjalan, dan kepatuhan pemeliharaan
          operasional lintas cabang.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm">
        {/* Selector periode */}
        <div className="relative inline-flex items-center">
          <Icon name="calendar_today" className="absolute left-2.5 text-outline text-[18px]" />
          <select
            className="h-9 pl-8 pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg appearance-none cursor-pointer focus:outline-none"
            id="periodeSelector"
            value={periode}
            onChange={(e) => {
              setPeriode(e.target.value)
              console.log('Periode diganti ke:', e.target.value)
            }}
          >
            {periodeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <Icon
            name="expand_more"
            className="absolute right-2 text-outline text-[18px] pointer-events-none"
          />
        </div>

        {/* Dropdown ekspor */}
        <div className="relative" ref={exportRef}>
          <button
            className="flex items-center gap-space-xs h-9 px-space-md bg-surface-container hover:bg-surface-container-high text-primary-container rounded-lg font-label-md text-label-md transition-colors"
            id="exportBtn"
            type="button"
            onClick={() => setExportOpen((open) => !open)}
          >
            <Icon name="ios_share" className="text-[18px]" />
            <span>Ekspor Laporan</span>
            <Icon name="arrow_drop_down" className="text-[16px]" />
          </button>
          <div
            className={`${
              exportOpen ? '' : 'hidden'
            } absolute right-0 mt-1 w-44 bg-surface-container-lowest rounded-lg shadow-xl py-1 z-30`}
            id="exportDropdown"
          >
            {exportOptions.map((option) => (
              <button
                key={option.id}
                className="w-full px-space-md py-space-xs text-left font-body-sm text-body-sm text-on-surface hover:bg-surface-container flex items-center gap-2"
                type="button"
                onClick={() => handleExport(option)}
              >
                <Icon name={option.icon} className={`text-[16px] ${option.iconClass}`} />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <button
          className="flex items-center gap-space-xs h-9 px-space-md bg-primary-container hover:bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-sm transition-all"
          type="button"
        >
          <Icon name="qr_code_scanner" className="text-[18px]" />
          <span>Scan QR Cepat</span>
        </button>
      </div>
    </div>
  )
}