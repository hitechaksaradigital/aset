import { useState } from 'react'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import { navSections } from '../../data/dashboard'

export default function Sidebar() {
  const [active, setActive] = useState('dashboard-dan-analitik')

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
      <div className="flex flex-col h-full">
        {/* Brand */}
        <div className="h-16 px-space-lg flex items-center gap-space-sm bg-surface-container-lowest">
          <Logo />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary-container font-bold tracking-tight leading-none">
              AssetIQ
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Enterprise EAM
            </span>
          </div>
        </div>

        {/* Navigasi */}
        <div className="overflow-y-auto flex-1 px-space-md py-space-sm">
          <nav className="flex flex-col gap-space-xs">
            {navSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <div
                  className={`px-space-sm pb-space-xs ${
                    sectionIndex === 0 ? 'pt-space-sm' : 'pt-space-md'
                  }`}
                >
                  <span className="font-label-sm text-label-sm text-outline font-semibold tracking-wider uppercase">
                    {section.title}
                  </span>
                </div>
                {section.items.map((item) => {
                  const isActive = active === item.id
                  return (
                    <a
                      key={item.id}
                      href="#"
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                        setActive(item.id)
                      }}
                      className={`flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-container text-on-primary font-bold'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                      }`}
                    >
                      <Icon name={item.icon} className="text-[18px]" />
                      <span className="font-body-md text-body-md">{item.label}</span>
                    </a>
                  )
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Status sinkronisasi */}
        <div className="p-space-md bg-surface-container-low m-space-sm rounded-xl">
          <div className="flex items-center gap-space-xs">
            <Icon name="cloud_sync" className="text-on-tertiary-container text-[18px]" />
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
              Sinkronisasi Realtime
            </span>
          </div>
          <div className="mt-space-xs flex items-center justify-between">
            <span className="font-data-code text-data-code text-on-tertiary-container font-semibold">
              Aktif • Telemetri 100%
            </span>
            <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse"></span>
          </div>
        </div>
      </div>
    </aside>
  )
}