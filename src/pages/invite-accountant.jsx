import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase/client";

const InviteAccountant = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const priorState = location.state || {};

    // Option state: 'invite', 'self_manage', or 'is_accountant'
    const [selectedOption, setSelectedOption] = useState('');
    const [accountantEmail, setAccountantEmail] = useState('');
    const [accountantName, setAccountantName] = useState('');
    const [inviteSent, setInviteSent] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const canContinue =
        selectedOption === 'self_manage' ||
        selectedOption === 'is_accountant' ||
        (selectedOption === 'invite' && inviteSent);

    const handleSendInvite = () => {
        if (!accountantEmail.trim()) return;
        setInviteSent(true);
    };

    const handleNext = async (e) => {
        e.preventDefault();
        if (!canContinue || saving) return;
        setSaving(true);
        setError(null);

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData.user) {
            setError("You must be signed in to continue.");
            setSaving(false);
            return;
        }
        const userId = userData.user.id;

        const { data: business, error: businessError } = await supabase
            .from("businesses")
            .insert({
                name: priorState.businessName || "Untitled Business",
                legal_structure: priorState.legalStructure || null,
                year_started: priorState.yearStarted ? Number(priorState.yearStarted) : null,
                country: priorState.country || "US",
                industry: priorState.industry || null,
                business_number: priorState.businessNumber || null,
                tax_registration_number: priorState.taxRegNumber || null,
                region: priorState.region || null,
                bookkeeping_method: priorState.bookkeeping || null,
                main_goal: priorState.goal || null,
                team_size: priorState.teamSize || null,
                created_by: userId,
            })
            .select()
            .single();

        if (businessError || !business) {
            setError(businessError?.message || "Failed to create business.");
            setSaving(false);
            return;
        }

        const { error: memberError } = await supabase.from("business_members").insert({
            business_id: business.id,
            user_id: userId,
            role: "owner",
            status: "active",
        });

        if (memberError) {
            setError(memberError.message);
            setSaving(false);
            return;
        }

        if (selectedOption === 'invite' && accountantEmail.trim()) {
            const { error: inviteError } = await supabase.from("invites").insert({
                business_id: business.id,
                email: accountantEmail.trim(),
                name: accountantName.trim() || null,
                role: "accountant",
                invited_by: userId,
            });
            if (inviteError) {
                setError(inviteError.message);
                setSaving(false);
                return;
            }
        }

        setSaving(false);
        navigate("/dashboard", {
            state: {
                businessId: business.id,
                businessName: business.name,
                firstName: priorState.firstName,
                justCreated: true,
            },
        });
    };

    return (
        <div className="min-h-screen flex bg-white font-sans text-gray-900 overflow-hidden">

            {/* Left Column - Form */}
            <div className="w-full lg:w-1.3/2 flex flex-col p-8 md:p-12 lg:p-16 xl:px-24">
                <div className='max-w-xl'>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-green-400 rounded-full w-5/5"></div>
                    </div>

                    {/* Header */}
                    <h2 className="mb-2">
                        Invite your Accountant
                    </h2>
                    <h5 className=" mb-8">
                        Invite them now so they can access your books directly - no whatsapp, no email, no excel.
                    </h5>




                    {/* Green Info Banner */}
                    <div className="max-w-xl bg-green-100 border border-green-300 rounded-xl p-3.5 mb-6">
                        <p className="lg:text-[16px] text-[14px] text-emerald-800 leading-relaxed font-medium">
                            Your accountant gets their own view - they see compliance, journal entries and CRA status. You see your business growth view. Same data, different lens.
                        </p>
                    </div>

                    {/* Form Selection Area */}
                    <form className="max-w-xl space-y-4" onSubmit={handleNext}>

                        {/* OPTION 1: Yes - Invite Accountant */}
                        <div
                            onClick={() => setSelectedOption('invite')}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedOption === 'invite'
                                ? 'bg-blue-100 border-[#002DF8]'
                                : 'bg-white border-blue-200 hover:border-blue-300'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="radio"
                                    name="accountantOption"
                                    checked={selectedOption === 'invite'}
                                    onChange={() => setSelectedOption('invite')}
                                    className="mt-1 h-4 w-4 text-[#002DF8] focus:ring-[#002DF8] border-gray-300"
                                />
                                <div>
                                    <span className="form-label">
                                        Yes - invite my accountant now
                                    </span>
                                    <span className="lg:text-[16px] text-[14px] text-gray-500 mt-0.5 block">
                                        They'll get an email invite to join your Tractbook workspace
                                    </span>
                                </div>
                            </div>

                            {/* Nested Fields when "Yes" is selected */}
                            {selectedOption === 'invite' && (
                                <div className="mt-4 pt-2 space-y-3 pl-7" onClick={(e) => e.stopPropagation()}>
                                    {/* Email Field */}
                                    <div>
                                        <label className="form-label">
                                            Accountant's mail <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="accountant@firm.ca"
                                            value={accountantEmail}
                                            onChange={(e) => {
                                                setAccountantEmail(e.target.value);
                                                setInviteSent(false);
                                            }}
                                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-400 bg-white"
                                        />
                                    </div>

                                    {/* Name Field */}
                                    <div>
                                        <label className="form-label">
                                            Accountant's name <span className="text-gray-400 font-normal">(optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Foram Shah"
                                            value={accountantName}
                                            onChange={(e) => setAccountantName(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-400 bg-white"
                                        />
                                    </div>

                                    {/* Send Invite Button */}
                                    <button
                                        type="button"
                                        onClick={handleSendInvite}
                                        disabled={!accountantEmail.trim()}
                                        className="px-6 py-2 bg-emerald-600 disabled:bg-emerald-200 text-white font-semibold text-xs rounded-lg hover:bg-emerald-700 transition-colors shadow-sm mt-1"
                                    >
                                        Send invite
                                    </button>

                                    {inviteSent && (
                                        <p className="text-xs text-emerald-700 font-medium">
                                            Invitation queued - will be sent once you finish setup
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* OPTION 2: No - I manage my own books */}
                        <div
                            onClick={() => setSelectedOption('self_manage')}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedOption === 'self_manage'
                                ? 'bg-blue-100 border-[#002DF8]'
                                : 'bg-white border-blue-200 hover:border-blue-300'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="radio"
                                    name="accountantOption"
                                    checked={selectedOption === 'self_manage'}
                                    onChange={() => setSelectedOption('self_manage')}
                                    className="mt-1 h-4 w-4 text-[#002DF8] focus:ring-[#002DF8] border-gray-300"
                                />
                                <div>
                                    <span className="form-label">
                                        No - I manage my own books
                                    </span>
                                    <span className="lg:text-[16px] text-[14px] text-gray-500 mt-0.5 block">
                                        You can invite an accountant any time from Settings.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* OPTION 3: I am the accountant */}
                        <div
                            onClick={() => setSelectedOption('is_accountant')}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedOption === 'is_accountant'
                                ? 'bg-blue-100 border-[#002DF8]'
                                : 'bg-white border-blue-200 hover:border-blue-300'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="radio"
                                    name="accountantOption"
                                    checked={selectedOption === 'is_accountant'}
                                    onChange={() => setSelectedOption('is_accountant')}
                                    className="mt-1 h-4 w-4 text-[#002DF8] focus:ring-[#002DF8] border-gray-300"
                                />
                                <div>
                                    <span className="form-label">
                                        I am the accountant
                                    </span>
                                    <span className="lg:text-[16px] text-[14px] text-gray-500 mt-0.5 block">
                                        You'll be setting up this workspace for a client.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        {/* Bottom Navigation Buttons */}
                        <div className="flex items-center justify-between pt-8">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-32 py-2.5 bg-gray-400 text-white font-medium text-sm rounded-lg hover:bg-gray-500 transition-colors shadow-sm"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={!canContinue || saving}
                                className="w-36 py-2.5 bg-[#002DF8] disabled:bg-blue-200 text-white font-medium text-sm rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                            >
                                {saving ? "Setting up..." : "Finish"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {/* Right Column - Placeholder Side Pane */}
            <div className="hidden lg:block lg:w-1/2 bg-[#D1D5DB] border-l border-gray-200">
                {/* Placeholder pane */}
            </div>

        </div>
    );
};

export default InviteAccountant;
