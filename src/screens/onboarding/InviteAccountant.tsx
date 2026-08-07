import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

type InviteChoice = "yes" | "no" | "self" | ""

export default function InviteAccountant() {
  const navigate = useNavigate()
  const location = useLocation()
  const priorState = (location.state as Record<string, unknown>) || {}

  const [choice, setChoice] = useState<InviteChoice>("")
  const [accountantEmail, setAccountantEmail] = useState("")
  const [accountantName, setAccountantName] = useState("")
  const [inviteSent, setInviteSent] = useState(false)

  const canContinue =
    choice === "no" ||
    choice === "self" ||
    (choice === "yes" && inviteSent)

  function handleSendInvite() {
    if (!accountantEmail.trim()) return
    // TEMP: no real invite email is sent yet.
    // TODO: wire to backend invite endpoint (creates invites row, sends email via Klara/notification service)
    setInviteSent(true)
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault()
    if (!canContinue) return
    navigate("/dashboard", {
      state: { ...priorState, accountantChoice: choice, accountantEmail, accountantName },
    })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-10 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-1">Invite your Accountant</h1>
      <p className="text-gray-500 text-sm mb-6">Tell us about you and your business</p>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm text-green-800">
        Your accountant gets their own view - they see compliance, journal entries and CRA status. You see your business growth view. Same data, different lens.
      </div>

      <form onSubmit={handleNext} className="space-y-3">
        <label
          className={`block border rounded-lg p-3 cursor-pointer ${
            choice === "yes" ? "border-blue-600 bg-blue-50" : "border-gray-200"
          }`}
        >
          <div className="flex items-start gap-2">
            <input
              type="radio"
              name="accountant-choice"
              checked={choice === "yes"}
              onChange={() => setChoice("yes")}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-sm">Yes - invite my accountant now</p>
              <p className="text-xs text-gray-500">
                They'll get an email invite to join your Tractbook workspace
              </p>
            </div>
          </div>
        </label>

        {choice === "yes" && (
          <div className="pl-2 space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Accountant's mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={accountantEmail}
                onChange={(e) => setAccountantEmail(e.target.value)}
                placeholder="accountant@firm.ca"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Accountant's name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={accountantName}
                onChange={(e) => setAccountantName(e.target.value)}
                placeholder="e.g. Foram Shah"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>
            <button
              type="button"
              onClick={handleSendInvite}
              disabled={!accountantEmail.trim()}
              className="w-full bg-green-600 disabled:bg-green-200 text-white rounded-lg py-3 font-medium"
            >
              Send invite
            </button>
            {inviteSent && (
              <p className="text-red-500 text-xs">Invitation sent to your email</p>
            )}
          </div>
        )}

        <label
          className={`block border rounded-lg p-3 cursor-pointer ${
            choice === "no" ? "border-blue-600 bg-blue-50" : "border-gray-200"
          }`}
        >
          <div className="flex items-start gap-2">
            <input
              type="radio"
              name="accountant-choice"
              checked={choice === "no"}
              onChange={() => setChoice("no")}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-sm">No - I manage my own books</p>
              <p className="text-xs text-gray-500">You can invite an accountant any time from Settings.</p>
            </div>
          </div>
        </label>

        <label
          className={`block border rounded-lg p-3 cursor-pointer ${
            choice === "self" ? "border-blue-600 bg-blue-50" : "border-gray-200"
          }`}
        >
          <div className="flex items-start gap-2">
            <input
              type="radio"
              name="accountant-choice"
              checked={choice === "self"}
              onChange={() => setChoice("self")}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-sm">I am the accountant</p>
              <p className="text-xs text-gray-500">You'll be setting up this workspace for a client.</p>
            </div>
          </div>
        </label>

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
            disabled={!canContinue}
            className="flex-1 bg-blue-700 disabled:bg-blue-200 text-white rounded-lg py-3 font-medium"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}
