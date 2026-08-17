import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase/client";

const TEAM_TEST_EMAILS = [
  "rakeshchandra.chandra21@gmail.com",
  "kloroncanada@gmail.com",
];

function isAllowedTestUser(email) {
  if (!email) return false;
  const normalized = email.toLowerCase();
  if (normalized.endsWith("@nxtwave.ca")) return true;
  return TEAM_TEST_EMAILS.includes(normalized);
}

function isValidNANPNumber(phone) {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length === 10;
}

export default function SecurityPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = location.state || {};

  const showSkip = import.meta.env.DEV || isAllowedTestUser(incoming.email);

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
    if (error) setError("");
  };

  const handleNext = async () => {
    if (loading) return;

    if (!isValidNANPNumber(phone)) {
      setError("Enter a valid US/Canadian phone number");
      return;
    }

    setError("");
    setLoading(true);

    const rawNumber = phone.replace(/[^\d]/g, "");
    const fullPhone = `+1${rawNumber}`;
    const displayPhone = `+1 (${rawNumber.slice(0, 3)}) ${rawNumber.slice(3, 6)}-${rawNumber.slice(6)}`;

    // Sends the SMS OTP through Supabase and attaches the number to the account.
    const { error: otpError } = await supabase.auth.updateUser({ phone: fullPhone });

    setLoading(false);

    if (otpError) {
      setError(otpError.message);
      return;
    }

    // redirect to otp page
    navigate("/otp-verify", {
      state: {
        ...incoming,
        phone: displayPhone,
        fullPhone,
      },
    });
  };

  const handleDevSkip = () => {
    if (incoming.existingUser) {
      navigate("/dashboard", {
        state: {
          businessId: incoming.businessId,
          businessName: incoming.businessName,
          justCreated: false,
        },
      });
    } else {
      navigate("/role");
    }
  };

  return (
    <div className="mainparent">
      {/* Tractbook Logo */}
      <div className="lg:mb-14 mb-8">
        <img src="/logoblack.svg" alt="tractbook" className="h-10" />
      </div>

      {/* Error Message Box */}
      {error && (
        <div className="w-full max-w-[480px] bg-red-50 border border-red-100 p-3 rounded-lg flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-2">
          <ShieldAlert className="text-red-500 w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Hero Text */}
      <div className=" mb-10">
        <h1 className="lg:mb-8 mb-4">Keep your account secure</h1>
        <h5 >
          Enter your number and we'll send a code to secure your account. No spam.
        </h5>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-[440px]">
        <label className="form-label">
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

        <p className="form-helper-text">
          Valid US/Canadian phone numbers only. <br />
          Message and data rates may apply.
        </p>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={loading}
          className="social-signup-btn"
        >
          {loading ? "Sending code..." : "Next"}
        </button>

        {showSkip && (
          <button
            type="button"
            onClick={handleDevSkip}
            className="form-helper-text"
          >
            Skip phone verification (test mode)
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pb-10 text-center">
        <p className="form-helper-text">
          Your data is secure and won't be shared with anyone. Read the details in our{" "}
          <span className="text-blue-600 cursor-pointer hover:underline font-medium">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
