import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const CODE_LENGTH = 6
const RESEND_SECONDS = 45

export default function VerifyCode() {
  const navigate = useNavigate()
  const location = useLocation()
  const phone = (location.state as { phone?: string })?.phone || "+1 (000) 000-0000"

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""))
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const [error, setError] = useState<string | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    setError(null)

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (next.every((d) => d !== "")) {
      handleVerify(next.join(""))
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handleVerify(code: string) {
    // TEMP: no real OTP has been sent yet (Twilio not wired).
    // TODO: replace with supabase.auth.verifyOtp({ phone, token: code, type: 'sms' })
    if (code.length !== CODE_LENGTH) return
    navigate("/loading", { state: { nextPath: "/role" } })
  }

  function handleResend() {
    setSecondsLeft(RESEND_SECONDS)
    setDigits(Array(CODE_LENGTH).fill(""))
    inputRefs.current[0]?.focus()
    // TODO: trigger real resend once Twilio is wired.
  }

  const timerLabel = `00:${secondsLeft.toString().padStart(2, "0")}`

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-10 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-1">Enter verification code</h1>
      <p className="text-gray-500 text-sm mb-1">
        We sent a six digit code to{" "}
        <span className="font-semibold text-gray-900">{phone}</span>.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 text-sm font-medium mb-8 text-left"
      >
        Change
      </button>

      <div className="flex gap-2 justify-between mb-2">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-12 h-14 text-center text-lg border border-gray-300 rounded-lg outline-none focus:border-blue-600"
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {secondsLeft > 0 ? (
        <p className="text-red-500 text-xs mb-6">
          Don't see it? Send a new code in {timerLabel}
        </p>
      ) : (
        <button
          onClick={handleResend}
          className="w-full bg-blue-700 text-white rounded-lg py-3 font-medium mb-6 mt-2"
        >
          Send a new code
        </button>
      )}

      <p className="text-center text-xs text-gray-500">
        Your data is secure and won't be shared with anyone. Read the details in our{" "}
        <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>
      </p>
    </div>
  )
}
