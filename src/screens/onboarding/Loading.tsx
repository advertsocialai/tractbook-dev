import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Loading() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as { nextPath?: string; [key: string]: unknown }) || {}
  const { nextPath = "/", ...rest } = state

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(nextPath, { replace: true, state: rest })
    }, 1200)
    return () => clearTimeout(timer)
  }, [navigate, nextPath])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  )
}
