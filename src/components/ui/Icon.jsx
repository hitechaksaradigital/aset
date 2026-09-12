/**
 * Wrapper Material Symbols (Google Fonts).
 * Pemakaian: <Icon name="dashboard" className="text-[18px]" />
 */
export default function Icon({ name, className = '', ...props }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true" {...props}>
      {name}
    </span>
  )
}