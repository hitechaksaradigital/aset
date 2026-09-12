export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-md px-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            © 2024 AssetIQ Enterprise EAM. Hak Cipta Dilindungi.
          </span>
          <span className="text-outline-variant">•</span>
          <span className="font-data-code text-data-code text-on-tertiary-container">
            Versi v4.8.2-Enterprise
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
          <span className="font-body-sm text-body-sm text-on-surface font-medium">
            Sinkronisasi Realtime: Aktif
          </span>
        </div>
      </div>
    </footer>
  )
}