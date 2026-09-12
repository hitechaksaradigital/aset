import Icon from '../ui/Icon'

/**
 * Banner konteks atas + quick action bar (Impor CSV, Cetak Label, Registrasi).
 */
export default function CatalogHeader() {
  return (
    <div className="w-full bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg">
      <div className="flex flex-col max-w-2xl">
        <div className="flex items-center gap-space-xs mb-space-xs">
          <span className="px-space-xs py-0.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded uppercase tracking-wider">
            Modul Registri Aset
          </span>
          <span className="text-outline-variant text-label-sm">•</span>
          <span className="font-data-code text-data-code text-on-tertiary-container flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container animate-pulse"></span>
            Audit Engine v4.8 Sync
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
          Katalog Aset Digital & Tracking Inventaris
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Pencatatan komprehensif tipe, identitas barcode/QR, spesifikasi operasional, kalkulasi
          depresiasi aset tetap, dan hierarki kustodian (custodian).
        </p>
      </div>

      {/* Quick Action Bar */}
      <div className="flex flex-wrap items-center gap-space-sm">
        <button
          className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-high transition-all"
          type="button"
        >
          <Icon name="upload_file" className="text-[18px]" />
          <span>Impor CSV</span>
        </button>
        <button
          className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-low text-secondary font-label-md text-label-md rounded-lg hover:bg-surface-container transition-all"
          type="button"
        >
          <Icon name="print" className="text-[18px]" />
          <span>Cetak Label Masal</span>
        </button>
        <button
          className="flex items-center gap-space-xs px-space-md py-space-xs bg-primary-container text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary shadow-sm hover:shadow transition-all"
          type="button"
        >
          <Icon name="add_circle" className="text-[18px]" />
          <span>+ Registrasi Aset Baru</span>
        </button>
      </div>
    </div>
  )
}