import Icon from '../ui/Icon'

/**
 * Widget pembantu: asisten scanner cepat (handheld USB / kamera).
 */
export default function ScannerAssistant() {
  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-space-sm">
        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
          <Icon name="barcode_scanner" className="text-[24px]" />
        </div>
        <div>
          <h5 className="font-headline-sm text-headline-sm text-primary font-bold">
            Input Cepat Barcode
          </h5>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
            Gunakan pembaca handheld USB atau kamera
          </p>
        </div>
      </div>
      <button
        className="px-space-sm py-1.5 bg-surface-container text-secondary rounded font-label-sm text-label-sm font-semibold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors"
        type="button"
      >
        Buka Scanner
      </button>
    </div>
  )
}