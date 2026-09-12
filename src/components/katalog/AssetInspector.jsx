import Icon from '../ui/Icon'
import QrCode from '../ui/QrCode'

/**
 * Panel inspektur aset (asset inspector drawer) — detail aset terpilih:
 * QR module, foto unit, spesifikasi, kalkulasi depresiasi, riwayat mutasi.
 */
export default function AssetInspector({ asset }) {
  if (!asset) return null
  const { detail } = asset

  const handleCopyId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(asset.id).catch(() => {})
    }
  }

  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
      {/* Inspector Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            Asset Inspector ID
          </span>
          <div className="flex items-center gap-space-xs mt-0.5">
            <span className="font-data-code text-[18px] font-bold text-primary">{asset.id}</span>
            <button
              className="text-on-surface-variant hover:text-primary"
              title="Salin ID"
              type="button"
              onClick={handleCopyId}
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
            </button>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded font-label-sm text-label-sm font-semibold ${detail.statusClass}`}
        >
          <span className={`w-2 h-2 rounded-full ${detail.statusDot}`}></span>
          {detail.statusLabel}
        </span>
      </div>

      {/* Asset Imagery & QR Barcode Module */}
      <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col sm:flex-row items-center gap-space-md">
        <div className="bg-surface-container-lowest p-2 rounded shadow-sm flex flex-col items-center justify-center shrink-0">
          <QrCode className="w-24 h-24 text-primary" />
          <span className="font-data-code text-[9px] text-on-surface-variant mt-1">
            STANDARD ISO/IEC 18004
          </span>
        </div>
        <div className="flex flex-col flex-1">
          <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
            {asset.shortName}
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-relaxed mt-0.5">
            {detail.qrNote}
          </p>
          <div className="mt-space-sm flex items-center gap-space-xs">
            <button
              className="px-2.5 py-1.5 bg-primary-container text-on-primary font-label-sm text-[11px] font-semibold rounded hover:bg-primary flex items-center gap-1 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">print</span>
              <span>Cetak Label 50x30mm</span>
            </button>
            <button
              className="p-1.5 bg-surface-container text-on-surface rounded hover:bg-surface-container-high"
              title="Download Vector"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hardware & Visual Photo Placeholder */}
      <div className="relative w-full h-32 rounded-lg overflow-hidden bg-gradient-to-br from-primary-container via-inverse-surface to-tertiary-container flex items-center justify-center">
        <span className="material-symbols-outlined text-[56px] text-surface-container-lowest/25">
          {asset.photo.icon}
        </span>
        <div className="absolute bottom-2 left-2 bg-primary/90 text-on-primary px-2 py-0.5 rounded font-label-sm text-[10px] backdrop-blur-sm flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px]">photo_camera</span>
          {asset.photo.condition}
        </div>
      </div>

      {/* TECHNICAL SPECIFICATIONS TABLE */}
      <div className="flex flex-col gap-space-xs">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
          Spesifikasi & Vendor
        </span>
        <div className="grid grid-cols-2 gap-x-space-md gap-y-2 py-space-xs text-body-sm">
          <div>
            <span className="text-on-surface-variant text-[11px] block">Vendor / Distributor</span>
            <span className="font-body-sm text-on-surface font-semibold">
              {detail.specs.vendor}
            </span>
          </div>
          <div>
            <span className="text-on-surface-variant text-[11px] block">Masa Garansi</span>
            <span className={`font-data-code font-semibold ${detail.specs.warrantyClass}`}>
              {detail.specs.warranty}
            </span>
          </div>
          <div>
            <span className="text-on-surface-variant text-[11px] block">Serial Number (SN)</span>
            <span className="font-data-code text-on-surface font-semibold">
              {detail.specs.serial}
            </span>
          </div>
          <div>
            <span className="text-on-surface-variant text-[11px] block">
              {detail.specs.metaLabel}
            </span>
            <span className="font-data-code text-on-surface">{detail.specs.metaValue}</span>
          </div>
          <div className="col-span-2">
            <span className="text-on-surface-variant text-[11px] block">
              Spesifikasi Detail Hardware
            </span>
            <span className="font-body-sm text-on-surface text-[12px] leading-snug block mt-0.5">
              {detail.specs.hardware}
            </span>
          </div>
        </div>
      </div>

      {/* AUTOMATED DEPRECIATION CALCULATION CARD (Straight-Line) */}
      <div className="bg-surface-container p-space-md rounded-lg flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">calculate</span>
            Kalkulasi Depresiasi Otomatis
          </span>
          <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface">
            Garis Lurus (Straight-Line)
          </span>
        </div>
        <div className="grid grid-cols-3 gap-space-xs text-center pt-space-xs">
          <div className="bg-surface-container-lowest p-2 rounded">
            <span className="text-on-surface-variant text-[10px] block">Harga Perolehan</span>
            <span className="font-data-code text-[12px] font-bold text-primary">
              {detail.depreciation.acquisition}
            </span>
          </div>
          <div className="bg-surface-container-lowest p-2 rounded">
            <span className="text-on-surface-variant text-[10px] block">Nilai Residu</span>
            <span className="font-data-code text-[12px] font-bold text-secondary">
              {detail.depreciation.residual}
            </span>
          </div>
          <div className="bg-surface-container-lowest p-2 rounded">
            <span className="text-on-surface-variant text-[10px] block">Nilai Buku Saat Ini</span>
            <span className="font-data-code text-[12px] font-bold text-on-tertiary-container">
              {detail.depreciation.current}
            </span>
          </div>
        </div>

        {/* Visual Depreciation Timeline Progress */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-on-surface-variant">{detail.depreciation.life}</span>
            <span className="font-data-code text-primary font-bold">
              {detail.depreciation.elapsed}
            </span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
            <div
              className="bg-on-tertiary-container h-full rounded-full"
              style={{ width: `${detail.depreciation.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between font-data-code text-[10px] text-outline">
            <span>{detail.depreciation.start}</span>
            <span>{detail.depreciation.end}</span>
          </div>
        </div>
      </div>

      {/* CUSTODIAN MUTATION & AUDIT LOG MINI-TIMELINE */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Riwayat Mutasi Kustodian
          </span>
          <span className="font-label-sm text-[11px] text-secondary font-semibold cursor-pointer hover:underline">
            Lihat Log Lengkap
          </span>
        </div>
        <div className="flex flex-col gap-space-sm pl-2 pt-space-xs">
          {detail.mutations.map((log) => (
            <div className="relative pl-6" key={log.person + log.date}>
              <div
                className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full ${
                  log.active
                    ? 'bg-on-tertiary-container ring-4 ring-surface-container-low'
                    : 'bg-outline-variant'
                }`}
              ></div>
              <div
                className={`font-label-sm text-[12px] font-semibold ${
                  log.active ? 'text-primary' : 'text-on-surface'
                }`}
              >
                {log.person}
              </div>
              <p className="font-body-sm text-[11px] text-on-surface-variant">{log.note}</p>
              <span className="font-data-code text-[10px] text-outline">{log.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inspector Action Buttons */}
      <div className="flex items-center gap-space-sm pt-space-xs">
        <button
          className="flex-1 py-2 bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">history_edu</span>
          <span>Jadwalkan Servis</span>
        </button>
        <button
          className="flex-1 py-2 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary transition-colors flex items-center justify-center gap-1"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          <span>Edit Data Aset</span>
        </button>
      </div>
    </div>
  )
}