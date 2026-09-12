import Icon from '../ui/Icon'
import { assetStatus } from '../../data/dashboard'

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
      {/* Kartu 1: Total Nilai Aset */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Total Nilai Aset
            </span>
            <span className="font-headline-md text-headline-md text-primary-container font-bold mt-1">
              Rp 84,65 M
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
            <Icon name="account_balance" className="text-[20px]" />
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            4.820 Unit Registrasi
          </span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container-high text-on-tertiary-container font-label-sm text-label-sm font-semibold">
            <Icon name="trending_up" className="text-[14px]" /> +4.2% YoY
          </span>
        </div>
      </div>

      {/* Kartu 2: Akumulasi Depresiasi */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Akumulasi Depresiasi (SLM)
            </span>
            <span className="font-headline-md text-headline-md text-error font-bold mt-1">
              Rp 18,30 M
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
            <Icon name="trending_down" className="text-[20px]" />
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Nilai Buku Bersih (NBV)
          </span>
          <span className="font-data-code text-data-code font-bold text-primary-container">
            Rp 66,35 M
          </span>
        </div>
      </div>

      {/* Kartu 3: Distribusi Status Aset */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Distribusi Status Aset
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-md text-headline-md text-primary-container font-bold">
                {assetStatus.activeCount}
              </span>
              <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
                {assetStatus.activeLabel}
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
            <Icon name="pie_chart" className="text-[20px]" />
          </div>
        </div>
        <div className="mt-space-md flex flex-col gap-1.5">
          <div className="w-full h-2 rounded-full overflow-hidden flex bg-surface-container">
            {assetStatus.segments.map((segment) => (
              <div
                key={segment.label}
                className={`h-full ${segment.color}`}
                style={{ width: `${segment.value}%` }}
                title={`${segment.label}: ${segment.value}%`}
              ></div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-data-code">
            {assetStatus.summary.map((item) => (
              <span key={item.label}>
                {item.label}: {item.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Kartu 4: Kesiapan & Kepatuhan SLA */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Kesiapan & Kepatuhan SLA
            </span>
            <span className="font-headline-md text-headline-md text-on-tertiary-container font-bold mt-1">
              94.8%
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-tertiary-container">
            <Icon name="verified" className="text-[20px]" />
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            18 PM Minggu Ini
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span> 3 Kritis
          </span>
        </div>
      </div>
    </div>
  )
}