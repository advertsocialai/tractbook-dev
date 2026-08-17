import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const CANADIAN_PROVINCES = [
  "Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba",
  "Saskatchewan", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador",
  "Prince Edward Island", "Northwest Territories", "Yukon", "Nunavut",
];

const US_STATES = [
  "California", "Texas", "New York", "Florida", "Illinois", "Other",
];

function isValidBN(value) {
  const cleaned = value.replace(/\s/g, "").toUpperCase();
  return /^\d{9}$/.test(cleaned) || /^\d{9}[A-Z]{2}\d{4}$/.test(cleaned);
}

function isValidHST(value) {
  const cleaned = value.replace(/\s/g, "").toUpperCase();
  return /^\d{9}RT\d{4}$/.test(cleaned);
}

function isValidEIN(value) {
  return /^\d{2}-?\d{7}$/.test(value.trim());
}

const BusinessTaxDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const priorState = location.state || {};
  const country = priorState.country || "US";
  const isCanada = country === "CA";

  // State for form controls
  const [businessNumber, setBusinessNumber] = useState("");
  const [noBnYet, setNoBnYet] = useState(false);
  const [bnTouched, setBnTouched] = useState(false);
  const [taxRegNumber, setTaxRegNumber] = useState("");
  const [notRegisteredHst, setNotRegisteredHst] = useState(false);
  const [taxRegTouched, setTaxRegTouched] = useState(false);
  const [region, setRegion] = useState("");

  const bnFormatValid = noBnYet || (isCanada ? isValidBN(businessNumber) : isValidEIN(businessNumber));
  const taxRegFormatValid = notRegisteredHst || (isCanada ? isValidHST(taxRegNumber) : taxRegNumber.trim().length > 0);

  const canSubmit =
    (noBnYet || businessNumber.trim().length > 0) &&
    (notRegisteredHst || taxRegNumber.trim().length > 0) &&
    bnFormatValid &&
    taxRegFormatValid &&
    region !== "";

  const showBnError = bnTouched && !noBnYet && businessNumber.trim().length > 0 && !bnFormatValid;
  const showTaxRegError = taxRegTouched && !notRegisteredHst && taxRegNumber.trim().length > 0 && isCanada && !taxRegFormatValid;

  const handleNext = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate("/industry", {
      state: { ...priorState, businessNumber, taxRegNumber, region },
    });
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900 overflow-hidden">

      {/* Left Column - Form */}
      <div className="w-full lg:w-1.3/2 flex flex-col p-8 md:p-12 lg:p-16 xl:px-24">
        <div className='max-w-xl'>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
            <div className="h-full bg-gradient-to-r from-blue-600 to-green-400 rounded-full w-2/5"></div>
          </div>

          {/* Header */}
          <h2 className="mb-2">
            Business & Tax Details
          </h2>
          <h5 className=" mb-8">
            Tell us about you and your business
          </h5>

          {/* Info Banner */}
          {isCanada && (
            <div className="max-w-xl bg-indigo-50/70 border border-indigo-200/80 rounded-lg p-3.5 flex items-center justify-between text-xs sm:text-sm text-indigo-900 mb-6">
              <span>Detected: Canada showing Canadian fields (BN, HST, CAD)</span>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-gray-700 hover:text-gray-900 font-medium underline underline-offset-2 ml-2 whitespace-nowrap"
              >
                Change country
              </button>
            </div>
          )}

          {/* Form */}
          <form className="max-w-xl space-y-6" onSubmit={handleNext}>

            {isCanada ? (
              /* SECTION 1: CANADA FIELDS */
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-wider text-gray-700 uppercase">
                    CANADA FIELDS
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                    AUTO-DETECTED
                  </span>
                </div>

                {/* Business Number (BN) */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="form-label">
                      Business Number (BN) - CRA<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      CANADA
                    </span>
                  </div>
                  <input
                    type="text"
                    value={businessNumber}
                    onChange={(e) => setBusinessNumber(e.target.value)}
                    onBlur={() => setBnTouched(true)}
                    disabled={noBnYet}
                    placeholder="123456789 or 123456789RT0001"
                    className="form-input-sm disabled:bg-gray-100"
                  />
                  {showBnError && (
                    <p className="text-red-500 text-xs mt-1">
                      Enter a valid 9-digit Business Number (e.g. 123456789 or 123456789RT0001)
                    </p>
                  )}
                  <div className="mt-2 flex items-center">
                    <input
                      id="no-bn"
                      type="checkbox"
                      checked={noBnYet}
                      onChange={(e) => setNoBnYet(e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="no-bn" className="form-checkbox-label">
                      I don't have a BN yet - I'll add it later
                    </label>
                  </div>
                </div>

                {/* HST/GST registration number */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="form-label">
                      HST/GST registration number<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      CANADA
                    </span>
                  </div>
                  <input
                    type="text"
                    value={taxRegNumber}
                    onChange={(e) => setTaxRegNumber(e.target.value)}
                    onBlur={() => setTaxRegTouched(true)}
                    disabled={notRegisteredHst}
                    placeholder="123456789RT0001"
                    className="form-input-sm disabled:bg-gray-100"
                  />
                  {showTaxRegError && (
                    <p className="text-red-500 text-xs mt-1">
                      Enter a valid GST/HST number in the format 123456789RT0001
                    </p>
                  )}
                  <div className="mt-2 flex items-center">
                    <input
                      id="not-hst"
                      type="checkbox"
                      checked={notRegisteredHst}
                      onChange={(e) => setNotRegisteredHst(e.target.checked)}
                      className="form-checkbox"
                    />

                    <label htmlFor="not-hst" className="form-checkbox-label">
                      I'm not registered for HST/GST yet
                    </label>
                  </div>
                </div>

                {/* Province of operation */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="form-label">
                      Province of operation<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      CANADA
                    </span>
                  </div>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="form-select-sm">
                    <option value="">Select a province...</option>
                    {CANADIAN_PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              /* SECTION 2: USA FIELDS */
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-wider text-gray-700 uppercase block">
                  USA FIELDS - SHOWN WHEN COUNTRY = UNITED STATES
                </span>

                {/* Employer Identification Number (EIN) */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="form-label">
                      Employer Identification Number (EIN)<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      USA ONLY
                    </span>
                  </div>
                  <input
                    type="text"
                    value={businessNumber}
                    onChange={(e) => setBusinessNumber(e.target.value)}
                    onBlur={() => setBnTouched(true)}
                    disabled={noBnYet}
                    placeholder="XX-XXXXXXX"
                    className="form-input-sm disabled:bg-gray-100"
                  />
                  {showBnError && (
                    <p className="text-red-500 text-xs mt-1">
                      Enter a valid EIN in the format 12-3456789
                    </p>
                  )}
                  <div className="mt-2 flex items-center">
                    <input
                      id="no-ein"
                      type="checkbox"
                      checked={noBnYet}
                      onChange={(e) => setNoBnYet(e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="no-ein" className="form-checkbox-label">
                      I don't have an EIN
                    </label>
                  </div>
                </div>

                {/* Sales tax registration */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="form-label">
                      Sales tax registration<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      USA ONLY
                    </span>
                  </div>
                  <input
                    type="text"
                    value={taxRegNumber}
                    onChange={(e) => setTaxRegNumber(e.target.value)}
                    disabled={notRegisteredHst}
                    placeholder="Sales tax permit number"
                    className="form-input-sm disabled:bg-gray-100"
                  />
                  <div className="mt-2 flex items-center">
                    <input
                      id="not-sales-tax"
                      type="checkbox"
                      checked={notRegisteredHst}
                      onChange={(e) => setNotRegisteredHst(e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="not-sales-tax" className="form-checkbox-label">
                      I'm not registered for sales tax yet
                    </label>
                  </div>
                </div>

                {/* State of operation */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="form-label">
                      State of operation<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      USA ONLY
                    </span>
                  </div>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="form-select-sm">
                    <option value="">Select a state...</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Navigation Action Buttons */}
            <div className="flex items-center justify-between pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-32 py-2.5 bg-gray-400 text-white font-medium text-sm rounded-lg hover:bg-gray-500 transition-colors shadow-sm"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-36 py-2.5 bg-blue-700 disabled:bg-blue-200 text-white font-medium text-sm rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
              >
                Next
              </button>
            </div>

          </form>
        </div>



      </div>
      {/* Right Column - Placeholder Graphic Side */}
      <div className="hidden lg:block lg:w-1/2 bg-[#D1D5DB] border-l border-gray-200">
        {/* Content/Graphic container for right side */}
      </div>
    </div>
  );
};

export default BusinessTaxDetails;
