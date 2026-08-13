import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SecurityPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
    if (error) setError(false);
  };

  const handleNext = () => {
    const rawNumber = phone.replace(/[^\d]/g, "");

    if (rawNumber.length !== 10) {
      setError(true);
    } else {
      setError(false);

      // redirect to otp page
      navigate("/otp-verify");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-10 px-6 font-sans">
      {/* Tractbook Logo */}
      <div className="mb-20">
        <img src="/logoblack.svg" alt="tractbook" className="h-8" />
      </div>

      {/* Error Message Box */}
      {error && (
        <div className="w-full max-w-[480px] bg-red-50 border border-red-100 p-3 rounded-lg flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-2">
          <ShieldAlert className="text-red-500 w-5 h-5" />
          <p className="text-sm font-medium">Enter a valid US/Canadian phone number</p>
        </div>
      )}

      {/* Hero Text */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-[48px] font-bold text-black mb-4">Keep your account secure</h1>
        <p className="text-gray-600 text-lg md:text-[20px] max-w-[500px] mx-auto leading-relaxed">
          Enter your number and we'll send a code to secure your account. No spam.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-[440px]">
        <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
          Enter phone number
        </label>

        <div className={`flex items-center border rounded-xl px-4 py-3.5 transition-all ${error ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500'}`}>
          {/* US/Canada Country Code Indicator */}
          <div className="flex items-center gap-1 pr-3 border-r border-gray-200 mr-3 text-gray-400">
            <span className="text-[16px]">+1</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(162) 826-7904"
            className="w-full bg-transparent outline-none text-[16px] text-gray-900 placeholder:text-gray-300"
          />
        </div>

        <p className="mt-3 text-[12px] text-gray-400 leading-relaxed">
          Valid US/Canadian phone numbers only. <br />
          Message and data rates may apply.
        </p>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full mt-8 py-4 bg-[#002DF8] text-white rounded-lg font-bold text-[16px] hover:bg-blue-500 transition-all active:scale-[0.98]"
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto pb-10 text-center">
        <p className="text-[12px] text-gray-400">
          Your data is secure and won't be shared with anyone. Read the details in our{" "}
          <span className="text-blue-600 cursor-pointer hover:underline font-medium">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}