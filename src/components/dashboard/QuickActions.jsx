import Icon from '../ui/Icon'
import { quickActions } from '../../data/dashboard'

export default function QuickActions() {
  return (
    <div className="bg-primary-container text-on-primary rounded-xl p-space-md shadow-md flex flex-col md:flex-row items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-md">
        <div className="w-11 h-11 rounded-lg bg-surface-container-lowest/10 flex items-center justify-center text-tertiary-fixed">
          <Icon name="bolt" className="text-[24px]" />
        </div>
        <div className="flex flex-col">
          <span className="font-label-md text-label-md font-semibold text-tertiary-fixed tracking-wider uppercase">
            Pusat Tindakan Kilat
          </span>
          <span className="font-body-md text-body-md text-surface-variant">
            Eksekusi operasional massal, mutasi, dan pencatatan audit tanpa meninggalkan dashboard.
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-space-sm w-full md:w-auto justify-end">
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-colors ${
              action.tone === 'primary'
                ? 'bg-on-tertiary-container hover:bg-opacity-90 text-on-primary shadow-sm'
                : 'bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary'
            }`}
          >
            <Icon name={action.icon} className="text-[18px]" />
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}