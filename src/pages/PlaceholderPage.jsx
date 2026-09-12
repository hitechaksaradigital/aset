import { useLocation } from 'react-router-dom'
import Icon from '../components/ui/Icon'
import { navSections } from '../data/dashboard'

/**
 * Halaman placeholder untuk modul yang belum diimplementasikan.
 */
export default function PlaceholderPage() {
  const { pathname } = useLocation()

  const current = navSections
    .flatMap((section) => section.items)
    .find((item) => item.path === pathname)

  return (
    <div className="flex flex-col w-full">
      <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-space-md min-h-[50vh]">
        <div className="w-16 h-16 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container">
          <Icon name={current?.icon ?? 'construction'} className="text-[32px]" />
        </div>
        <div className="flex flex-col gap-space-xs">
          <span className="px-space-xs py-0.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded uppercase tracking-wider w-fit mx-auto">
            Modul Registri
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary-container font-bold tracking-tight">
            {current?.label ?? 'Modul'}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Modul ini sedang dalam pengembangan. Navigasi ke{' '}
            <span className="font-semibold text-on-tertiary-container">Dashboard & Analitik</span>{' '}
            atau <span className="font-semibold text-on-tertiary-container">Katalog Aset</span> untuk
            melihat halaman yang sudah aktif.
          </p>
        </div>
      </div>
    </div>
  )
}