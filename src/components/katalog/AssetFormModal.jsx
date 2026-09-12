import { useEffect, useState } from 'react'
import Icon from '../ui/Icon'
import { filterOptions } from '../../data/katalogAset'

const inputClass =
  'w-full h-10 px-3 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:bg-surface-container-lowest transition-all'

const emptyForm = {
  name: '',
  assetCode: '',
  categoryKey: 'IT Datacenter',
  locationKey: 'HQ Jakarta',
  detailLokasi: '',
  status: 'Tersedia',
  serialNumber: '',
  specs: '',
  custodianName: '',
  custodianRole: '',
  custodianGroup: 'IT Infra',
  vendor: '',
  acquisitionValue: '',
  residualValue: '',
  usefulLifeMonths: 60,
  monthsElapsed: 0,
  warrantyUntil: '',
  metaLabel: 'MAC Address',
  metaValue: '',
  hardwareSpec: '',
  qrNote: '',
}

const categoryPrefixMap = {
  'IT Datacenter': 'IT',
  Kendaraan: 'VH',
  'Mesin Pabrik': 'MC',
  'Laptop & Gadget': 'IT',
  Furniture: 'FN',
}

const generateCode = (categoryKey) =>
  `AST-${categoryPrefixMap[categoryKey] ?? 'AST'}-${String(Math.floor(1000 + Math.random() * 9000))}`

/**
 * Modal registrasi aset baru — data disimpan ke tabel `assets` di Supabase.
 */
export default function AssetFormModal({ open, onClose, onSubmit, submitting, submitError }) {
  const [form, setForm] = useState(emptyForm)
  const [codeEdited, setCodeEdited] = useState(false)

  // Reset & generate kode aset otomatis setiap kali modal dibuka
  useEffect(() => {
    if (open) {
      setForm({ ...emptyForm, assetCode: generateCode(emptyForm.categoryKey) })
      setCodeEdited(false)
    }
  }, [open])

  // Tutup dengan tombol Escape
  useEffect(() => {
    if (!open) return undefined
    const handler = (e) => {
      if (e.key === 'Escape' && !submitting) onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, submitting, onClose])

  if (!open) return null

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleCategoryChange = (value) => {
    setForm((prev) => ({
      ...prev,
      categoryKey: value,
      assetCode: codeEdited ? prev.assetCode : generateCode(value),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const categoryLabel =
      filterOptions.kategori.find((opt) => opt.value === form.categoryKey)?.label ?? form.categoryKey
    const siteLabel =
      filterOptions.lokasi.find((opt) => opt.value === form.locationKey)?.label ?? form.locationKey
    onSubmit({
      ...form,
      categoryLabel,
      locationLabel: form.detailLokasi.trim() || siteLabel,
    })
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-space-lg bg-primary/40 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-space-lg flex items-start justify-between border-b border-surface-container">
          <div>
            <span className="px-space-xs py-0.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded uppercase tracking-wider">
              Modul Registri Aset
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold mt-space-xs">
              Registrasi Aset Baru
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Data akan tersimpan ke database Supabase dan langsung tampil pada daftar inventaris.
            </p>
          </div>
          <button
            className="p-1 text-on-surface-variant hover:bg-surface-container rounded"
            type="button"
            onClick={onClose}
            disabled={submitting}
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form className="overflow-y-auto p-space-lg flex flex-col gap-space-md" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="md:col-span-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Nama Aset <span className="text-error">*</span>
              </label>
              <input
                required
                className={inputClass}
                placeholder="mis. Dell PowerEdge R750 Rack Server"
                type="text"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Kode Aset
              </label>
              <input
                className={`${inputClass} font-data-code`}
                placeholder="AST-IT-0000"
                type="text"
                value={form.assetCode}
                onChange={(e) => {
                  setCodeEdited(true)
                  setField('assetCode', e.target.value)
                }}
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Serial Number
              </label>
              <input
                className={`${inputClass} font-data-code`}
                placeholder="SN: XXX-0000"
                type="text"
                value={form.serialNumber}
                onChange={(e) => setField('serialNumber', e.target.value)}
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Kategori <span className="text-error">*</span>
              </label>
              <select
                className={`${inputClass} cursor-pointer`}
                value={form.categoryKey}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {filterOptions.kategori.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Lokasi Site <span className="text-error">*</span>
              </label>
              <select
                className={`${inputClass} cursor-pointer`}
                value={form.locationKey}
                onChange={(e) => setField('locationKey', e.target.value)}
              >
                {filterOptions.lokasi.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Detail Lokasi
              </label>
              <input
                className={inputClass}
                placeholder="mis. HQ-Lt.3 Server Rm (Rack D4)"
                type="text"
                value={form.detailLokasi}
                onChange={(e) => setField('detailLokasi', e.target.value)}
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Status Operasional <span className="text-error">*</span>
              </label>
              <select
                className={`${inputClass} cursor-pointer`}
                value={form.status}
                onChange={(e) => setField('status', e.target.value)}
              >
                {filterOptions.status.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Spesifikasi Ringkas
              </label>
              <input
                className={inputClass}
                placeholder="mis. Intel Core i7 • 32GB RAM • 1TB SSD"
                type="text"
                value={form.specs}
                onChange={(e) => setField('specs', e.target.value)}
              />
            </div>

            {/* Kustodian */}
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Nama Kustodian <span className="text-error">*</span>
              </label>
              <input
                className={inputClass}
                placeholder="mis. Budi Raharjo"
                type="text"
                value={form.custodianName}
                onChange={(e) => setField('custodianName', e.target.value)}
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Jabatan / Divisi
              </label>
              <input
                className={inputClass}
                placeholder="mis. IT Infrastructure"
                type="text"
                value={form.custodianRole}
                onChange={(e) => setField('custodianRole', e.target.value)}
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Grup Kustodian
              </label>
              <select
                className={`${inputClass} cursor-pointer`}
                value={form.custodianGroup}
                onChange={(e) => setField('custodianGroup', e.target.value)}
              >
                {filterOptions.kustodian.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Vendor / Distributor
              </label>
              <input
                className={inputClass}
                placeholder="mis. PT Sistech Kharisma"
                type="text"
                value={form.vendor}
                onChange={(e) => setField('vendor', e.target.value)}
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Harga Perolehan (Rp)
              </label>
              <input
                className={inputClass}
                min="0"
                placeholder="145000000"
                type="number"
                value={form.acquisitionValue}
                onChange={(e) => setField('acquisitionValue', e.target.value)}
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Nilai Residu (Rp)
              </label>
              <input
                className={inputClass}
                min="0"
                placeholder="10000000"
                type="number"
                value={form.residualValue}
                onChange={(e) => setField('residualValue', e.target.value)}
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Masa Manfaat (bulan)
              </label>
              <input
                className={inputClass}
                min="1"
                type="number"
                value={form.usefulLifeMonths}
                onChange={(e) => setField('usefulLifeMonths', e.target.value)}
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Garansi Berlaku s/d
              </label>
              <input
                className={inputClass}
                type="date"
                value={form.warrantyUntil}
                onChange={(e) => setField('warrantyUntil', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block mb-1">
                Spesifikasi Detail Hardware
              </label>
              <textarea
                className="w-full min-h-[64px] px-3 py-2 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:bg-surface-container-lowest transition-all"
                placeholder="Detail lengkap spesifikasi unit..."
                value={form.hardwareSpec}
                onChange={(e) => setField('hardwareSpec', e.target.value)}
              />
            </div>
          </div>

          {submitError && (
            <div className="p-space-sm bg-error-container text-on-error-container font-body-sm text-body-sm rounded-lg flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {submitError}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-space-sm pt-space-xs">
            <button
              className="px-space-lg py-2 bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              type="button"
              onClick={onClose}
              disabled={submitting}
            >
              Batal
            </button>
            <button
              className="flex items-center gap-space-xs px-space-lg py-2 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary shadow-sm transition-colors disabled:opacity-60"
              type="submit"
              disabled={submitting || !form.name.trim() || !form.custodianName.trim()}
            >
              <span className="material-symbols-outlined text-[18px]">
                {submitting ? 'progress_activity' : 'save'}
              </span>
              <span>{submitting ? 'Menyimpan...' : 'Simpan & Registrasi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}