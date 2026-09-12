import Icon from '../ui/Icon'
import { catalogKpis } from '../../data/katalogAset'

/**
 * Ringkasan telemetri KPI katalog (4 kartu dengan progress bar).
 */
export default function CatalogKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
      {catalogKpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {kpi.label}
            </span>
            <Icon name={kpi.icon} className={`text-[20px] ${kpi.iconClass}`} />
          </div>
          <div className="mt-space-sm flex items-baseline justify-between">
            <span className="font-data-metric text-data-metric text-primary font-bold">
              {kpi.value}
            </span>
            {kpi.badge.plain ? (
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {kpi.badge.text}
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-0.5 px-space-xs py-0.5 rounded font-data-code text-data-code ${kpi.badge.class} ${
                  kpi.badge.mono ? '' : 'font-label-sm text-label-sm font-semibold'
                }`}
              >
                {kpi.badge.text}
              </span>
            )}
          </div>
          <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-space-sm overflow-hidden">
            <div className={`h-full ${kpi.bar.color}`} style={{ width: kpi.bar.width }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}