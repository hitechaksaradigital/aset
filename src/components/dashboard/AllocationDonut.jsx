import Icon from '../ui/Icon'
import { allocationSegments } from '../../data/dashboard'

/**
 * Donut chart distribusi alokasi aset per unit kerja.
 * Segmen dihitung otomatis (dasharray/dashoffset kumulatif) dari data.
 */
export default function AllocationDonut() {
  let cumulative = 0
  const donutCircles = allocationSegments.map((segment) => {
    const dashoffset = -cumulative
    cumulative += segment.value
    return (
      <circle
        key={segment.label}
        cx="18"
        cy="18"
        fill="none"
        r="15.915"
        stroke={segment.color}
        strokeDasharray={`${segment.value} ${100 - segment.value}`}
        strokeDashoffset={dashoffset}
        strokeWidth="4.2"
      ></circle>
    )
  })

  return (
    <div className="xl:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-space-xs">
          <h2 className="font-headline-sm text-headline-sm text-primary-container font-bold">
            Distribusi Alokasi per Unit Kerja
          </h2>
          <button
            className="p-1 hover:bg-surface-container rounded text-on-surface-variant"
            type="button"
            aria-label="Opsi lainnya"
          >
            <Icon name="more_horiz" className="text-[18px]" />
          </button>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
          Komposisi portfolio modal tetap aktif menurut departemen operasional.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-space-md">
          {/* Donut */}
          <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" fill="none" r="15.915" stroke="#e6eeff" strokeWidth="4.2"></circle>
              {donutCircles}
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-data-code text-data-metric text-primary-container font-bold">
                4.82k
              </span>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">
                Total Unit
              </span>
            </div>
          </div>

          {/* Legenda */}
          <div className="flex flex-col gap-2 w-full">
            {allocationSegments.map((segment) => (
              <div
                key={segment.label}
                className="flex items-center justify-between p-1.5 rounded bg-surface-container-low"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded"
                    style={{ backgroundColor: segment.color }}
                  ></span>
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    {segment.label}
                  </span>
                </div>
                <span
                  className={`font-data-code text-body-sm font-bold ${segment.textClass}`}
                >
                  {segment.value}%{' '}
                  <span className="font-normal text-on-surface-variant">({segment.amount})</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-space-md pt-space-xs flex items-center justify-between">
        <a
          className="font-label-md text-label-md text-secondary hover:text-primary-container font-semibold flex items-center gap-1"
          href="#"
        >
          <span>Lihat Laporan Alokasi Per Cabang</span>
          <Icon name="chevron_right" className="text-[16px]" />
        </a>
        <span className="font-data-code text-label-sm text-outline">Per Tanggal: Hari Ini</span>
      </div>
    </div>
  )
}