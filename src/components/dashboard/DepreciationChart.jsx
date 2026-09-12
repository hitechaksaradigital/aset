import Icon from '../ui/Icon'

/**
 * Grafik garis tren depresiasi nilai buku & proyeksi 5 tahun.
 * SVG direplikasi persis dari desain referensi (viewBox 540x220).
 */
export default function DepreciationChart() {
  return (
    <div className="xl:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-md">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-primary-container font-bold">
            Tren Depresiasi Nilai Buku & Proyeksi 5 Tahun
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Perbandingan Nilai Perolehan Historis vs Nilai Buku (Straight-Line Basis)
          </p>
        </div>
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-primary-container"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Perolehan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-on-tertiary-container"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Nilai Buku</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-64 sm:h-72">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 540 220">
          <defs>
            <linearGradient id="chartGradientTeal" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#08968d" stopOpacity="0.25"></stop>
              <stop offset="100%" stopColor="#08968d" stopOpacity="0.0"></stop>
            </linearGradient>
            <linearGradient id="chartGradientNavy" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#123B6D" stopOpacity="0.18"></stop>
              <stop offset="100%" stopColor="#123B6D" stopOpacity="0.0"></stop>
            </linearGradient>
          </defs>

          {/* Gridlines */}
          <line stroke="#CEDBEA" strokeDasharray="3 3" strokeWidth="0.75" x1="40" x2="520" y1="30" y2="30"></line>
          <line stroke="#CEDBEA" strokeDasharray="3 3" strokeWidth="0.75" x1="40" x2="520" y1="75" y2="75"></line>
          <line stroke="#CEDBEA" strokeDasharray="3 3" strokeWidth="0.75" x1="40" x2="520" y1="120" y2="120"></line>
          <line stroke="#CEDBEA" strokeDasharray="3 3" strokeWidth="0.75" x1="40" x2="520" y1="165" y2="165"></line>
          <line stroke="#C1CEDD" strokeWidth="1" x1="40" x2="520" y1="200" y2="200"></line>

          {/* Label sumbu Y */}
          <text className="font-data-code text-[9px] fill-on-surface-variant" x="10" y="34">100M</text>
          <text className="font-data-code text-[9px] fill-on-surface-variant" x="14" y="79">75M</text>
          <text className="font-data-code text-[9px] fill-on-surface-variant" x="14" y="124">50M</text>
          <text className="font-data-code text-[9px] fill-on-surface-variant" x="14" y="169">25M</text>
          <text className="font-data-code text-[9px] fill-on-surface-variant" x="24" y="204">0</text>

          {/* Seri Nilai Perolehan (navy) */}
          <path
            d="M 60,110 L 160,95 L 260,80 L 360,65 L 480,50 L 480,200 L 60,200 Z"
            fill="url(#chartGradientNavy)"
          ></path>
          <polyline
            fill="none"
            points="60,110 160,95 260,80 360,65 480,50"
            stroke="#123B6D"
            strokeWidth="2.5"
          ></polyline>

          {/* Seri Nilai Buku (teal) */}
          <path
            d="M 60,120 L 160,132 L 260,146 L 360,162 L 480,175 L 480,200 L 60,200 Z"
            fill="url(#chartGradientTeal)"
          ></path>
          <polyline
            fill="none"
            points="60,120 160,132 260,146 360,162 480,175"
            stroke="#08968d"
            strokeWidth="2.5"
          ></polyline>

          {/* Titik data Perolehan */}
          <circle cx="60" cy="110" fill="#123B6D" r="4"></circle>
          <circle cx="160" cy="95" fill="#123B6D" r="4"></circle>
          <circle cx="260" cy="80" fill="#123B6D" r="4"></circle>
          <circle cx="360" cy="65" fill="#123B6D" r="4"></circle>
          <circle cx="480" cy="50" fill="#123B6D" r="4"></circle>

          {/* Titik data Nilai Buku */}
          <circle cx="60" cy="120" fill="#08968d" r="4"></circle>
          <circle cx="160" cy="132" fill="#08968d" r="4"></circle>
          <circle cx="260" cy="146" fill="#08968d" r="4"></circle>
          <circle cx="360" cy="162" fill="#08968d" r="4"></circle>
          <circle cx="480" cy="175" fill="#08968d" r="4"></circle>

          {/* Label sumbu X */}
          <text className="font-data-code text-[10px] fill-on-surface-variant" x="50" y="214">2021</text>
          <text className="font-data-code text-[10px] fill-on-surface-variant" x="150" y="214">2022</text>
          <text className="font-data-code text-[10px] fill-on-surface-variant" x="250" y="214">2023</text>
          <text className="font-data-code text-[10px] fill-on-surface-variant" x="350" y="214">2024</text>
          <text className="font-data-code text-[10px] fill-on-surface-variant" x="460" y="214">2025 (P)</text>
        </svg>
      </div>

      <div className="mt-space-sm p-space-sm bg-surface-container-low rounded-lg flex flex-wrap items-center justify-between gap-space-xs text-on-surface">
        <div className="flex items-center gap-space-xs">
          <Icon name="insights" className="text-primary-container text-[18px]" />
          <span className="font-body-sm text-body-sm font-medium">
            Laju depresiasi tahunan terpantau stabil pada rata-rata 11.2% per siklus fiskal.
          </span>
        </div>
        <span className="font-data-code text-data-code text-on-tertiary-container font-bold">
          Rasio NBV/CAPEX: 78.3%
        </span>
      </div>
    </div>
  )
}