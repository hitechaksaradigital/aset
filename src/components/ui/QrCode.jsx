/**
 * Simulasi QR Code SVG (replikasi persis dari desain referensi).
 */
export default function QrCode({ className = 'w-24 h-24' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 100 100">
      {/* Corner Finder 1 */}
      <rect fill="currentColor" height="30" rx="2" width="30" x="5" y="5"></rect>
      <rect fill="#ffffff" height="22" width="22" x="9" y="9"></rect>
      <rect fill="currentColor" height="14" width="14" x="13" y="13"></rect>
      {/* Corner Finder 2 */}
      <rect fill="currentColor" height="30" rx="2" width="30" x="65" y="5"></rect>
      <rect fill="#ffffff" height="22" width="22" x="69" y="9"></rect>
      <rect fill="currentColor" height="14" width="14" x="73" y="13"></rect>
      {/* Corner Finder 3 */}
      <rect fill="currentColor" height="30" rx="2" width="30" x="5" y="65"></rect>
      <rect fill="#ffffff" height="22" width="22" x="9" y="69"></rect>
      <rect fill="currentColor" height="14" width="14" x="13" y="73"></rect>
      {/* Matrix Patterns */}
      <rect height="8" width="8" x="42" y="10"></rect>
      <rect height="8" width="6" x="48" y="24"></rect>
      <rect height="6" width="8" x="12" y="44"></rect>
      <rect height="6" width="6" x="26" y="48"></rect>
      <rect height="12" width="12" x="44" y="44"></rect>
      <rect height="6" width="14" x="64" y="44"></rect>
      <rect height="8" width="8" x="84" y="44"></rect>
      <rect height="14" width="8" x="44" y="66"></rect>
      <rect height="8" width="14" x="60" y="66"></rect>
      <rect height="12" width="12" x="80" y="64"></rect>
      <rect height="12" width="8" x="68" y="80"></rect>
      <rect height="8" width="8" x="84" y="84"></rect>
    </svg>
  )
}