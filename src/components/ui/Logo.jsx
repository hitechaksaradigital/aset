/**
 * Logo mark AssetIQ Enterprise EAM (SVG inline, tanpa aset eksternal).
 */
export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={`${className} flex-shrink-0`} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#121358" />
      <rect x="6.5" y="6.5" width="8.5" height="8.5" rx="2" fill="#ffffff" />
      <rect x="17" y="6.5" width="8.5" height="8.5" rx="2" fill="#08968d" />
      <rect x="6.5" y="17" width="8.5" height="8.5" rx="2" fill="#4e599e" />
      <rect x="17" y="17" width="8.5" height="8.5" rx="4.25" fill="#ffffff" opacity="0.4" />
    </svg>
  )
}