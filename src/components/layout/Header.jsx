import { useEffect, useRef } from 'react'
import Icon from '../ui/Icon'

export default function Header() {
  const searchRef = useRef(null)

  // Shortcut Ctrl/Cmd + K untuk fokus ke pencarian
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40">
      <div className="w-full h-16 px-space-lg flex items-center justify-between gap-space-md">
        {/* Pencarian global */}
        <div className="flex items-center gap-space-md flex-1 max-w-xl">
          <div className="relative w-full flex items-center">
            <Icon name="search" className="absolute left-space-sm text-outline text-[20px]" />
            <input
              ref={searchRef}
              className="w-full h-9 pl-9 pr-20 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary"
              placeholder="Cari ID aset, serial number, atau model barcode..."
              type="text"
            />
            <div className="absolute right-space-xs flex items-center gap-space-xs">
              <kbd className="px-space-xs py-0.5 bg-surface-container text-on-surface font-data-code text-data-code rounded">
                Ctrl + K
              </kbd>
            </div>
          </div>
        </div>

        {/* Aksi & profil */}
        <div className="flex items-center gap-space-md">
          <button
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary transition-colors"
            type="button"
          >
            <Icon name="add" className="text-[18px]" />
            <span>Tambah Aset / Scan QR</span>
          </button>

          <div className="relative">
            <button
              className="relative p-space-xs text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors"
              type="button"
              aria-label="Notifikasi"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface"></span>
            </button>
          </div>

          <div className="flex items-center gap-space-sm pl-space-sm">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-md text-label-md font-bold">
              BS
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                Budi Santoso
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                Director of Asset Ops
              </span>
            </div>
            <span className="px-space-xs py-0.5 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm rounded-full font-semibold">
              Admin Global
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}