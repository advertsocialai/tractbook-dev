import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"

export default function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function handleCallback() {
      const { data, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !data.session) {
        setError("Something went wrong signing you in. Please try again.")
        setTimeout(() => navigate("/login"), 3000)
        return
      }

      const user = data.session.user

      const { data: membership } = await supabase
        .from("business_members")
        .select("business_id, businesses(name)")
        .eq("user_id", user.id)
        .eq("status", "active")
        .limit(1)
        .maybeSingle()

      const existingUser = !!membership
      const businessId = membership?.business_id
      const businessName = (membership?.businesses as { name?: string } | null)?.name

      navigate("/verify-phone", {
        state: {
          existingUser,
          businessId,
          businessName,
          email: user.email,
        },
      })
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <p className="text-gray-500 text-sm">Signing you in...</p>
      )}
    </div>
  )
}
