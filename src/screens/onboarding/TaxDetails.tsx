import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const CANADIAN_PROVINCES = [
  "Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba",
  "Saskatchewan", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador",
  "Prince Edward Island", "Northwest Territories", "Yukon", "Nunavut",
]

const US_STATES = [
  "California", "Texas", "New York", "Florida", "Illinois", "Other",
]

export default function TaxDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const priorState = (location.state as Record<string, unknown>) || {}
  const country = (priorState.country as string) || "US"
  const isCanada = country === "CA"

  const [businessNumber, setBusinessNumber] = useState("")
  const [noBN, setNoBN] = useState(false)
  const [taxRegNumber, setTaxRegNumber] = useState("")
  const [noTaxReg, setNoTaxReg] = useState(false)
  const [region, setRegion] = useState("")

  const canSubmit =
    (noBN || businessNumber.trim().length > 0) &&
    (noTaxReg || taxRegNumber.trim().length > 0) &&
    region !== ""

  function handleNext(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    navigate("/industry", {
      state: { ...priorState, businessNumber, taxRegNumber, region },
    })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-10 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-1">Business &amp; Tax Details</h1>
      <p className="text-gray-500 text-sm mb-6">Tell us about you and your business</p>

      {isCanada && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center justify-between text-sm">
          <span className="text-green-800">
            Detected: Canada showing Canadian fields (BN, HST, CAD)
          </span>
          <button type="button" className="text-blue-600 font-medium whitespace-nowrap ml-2">
            Change country
          </button>
        </div>
      )}

      <form onSubmit={handleNext} className="space-y-4">
        {isCanada ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">CANADA FIELDS</span>
              <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">AUTO-DETECTED</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm font-medium">Business Number (BN) - CRA</label>
                <span className="text-red-500">*</span>
                <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">CANADA</span>
              </div>
              <input
                type="text"
                value={businessNumber}
                onChange={(e) => setBusinessNumber(e.target.value)}
                disabled={noBN}
                placeholder="123456789 RT0001"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600 disabled:bg-gray-100"
              />
              <label className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <input type="checkbox" checked={noBN} onChange={(e) => setNoBN(e.target.checked)} />
                I don't have a BN yet - I'll add it later
              </label>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm font-medium">HST/GST registration number</label>
                <span className="text-red-500">*</span>
                <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">CANADA</span>
              </div>
              <input
                type="text"
                value={taxRegNumber}
                onChange={(e) => setTaxRegNumber(e.target.value)}
                disabled={noTaxReg}
                placeholder="RT 123456789"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600 disabled:bg-gray-100"
              />
              <label className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <input type="checkbox" checked={noTaxReg} onChange={(e) => setNoTaxReg(e.target.checked)} />
                I'm not registered for HST/GST yet
              </label>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm font-medium">Province of operation</label>
                <span className="text-red-500">*</span>
                <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">CANADA</span>
              </div>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="">Select a province...</option>
                {CANADIAN_PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">
                EIN (Employer ID Number) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={businessNumber}
                onChange={(e) => setBusinessNumber(e.target.value)}
                disabled={noBN}
                placeholder="12-3456789"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600 disabled:bg-gray-100"
              />
              <label className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <input type="checkbox" checked={noBN} onChange={(e) => setNoBN(e.target.checked)} />
                I don't have an EIN yet - I'll add it later
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Sales tax registration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={taxRegNumber}
                onChange={(e) => setTaxRegNumber(e.target.value)}
                disabled={noTaxReg}
                placeholder="Sales tax permit number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600 disabled:bg-gray-100"
              />
              <label className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <input type="checkbox" checked={noTaxReg} onChange={(e) => setNoTaxReg(e.target.checked)} />
                I'm not registered for sales tax yet
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                State of operation <span className="text-red-500">*</span>
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="">Select a state...</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-300 text-gray-600 rounded-lg py-3 font-medium"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex-1 bg-blue-700 disabled:bg-blue-200 text-white rounded-lg py-3 font-medium"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}
