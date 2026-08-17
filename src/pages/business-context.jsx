import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";

const MoreAboutYourBusiness = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const priorState = location.state || {};

  // Form State
  const [managementMethod, setManagementMethod] = useState('');
  const [mainGoal, setMainGoal] = useState('');
  const [teamSize, setTeamSize] = useState('');

  const managementOptions = [
    { id: 'excel', label: 'Excel / Google Sheets - manual' },
    { id: 'quickbooks', label: 'QuickBooks or Xero' },
    { id: 'wave', label: 'Wave' },
    { id: 'fresh', label: 'Nothing yet - starting fresh' },
  ];

  const goalOptions = [
    { id: 'get_paid_faster', label: 'Get Paid Faster' },
    { id: 'manage_expenses', label: 'Manage expenses' },
    { id: 'file_taxes', label: 'File taxes easier' },
    { id: 'replace_software', label: 'Replace my current software' },
    { id: 'all_above', label: 'All of the above' },
  ];

  const teamSizeOptions = [
    { id: 'just_me', label: 'Just me' },
    { id: '2-5', label: '2 - 5' },
    { id: '6-20', label: '6 - 20' },
    { id: '20+', label: '20+' },
  ];

  const canSubmit = managementMethod !== '' && mainGoal !== '' && teamSize !== '';

  const handleNext = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate("/invite-accountant", {
      state: {
        ...priorState,
        bookkeeping: managementMethod,
        goal: mainGoal,
        teamSize,
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
            <div className="h-full bg-gradient-to-r from-blue-600 to-green-400 rounded-full w-4/5"></div>
          </div>

          {/* Header */}
          <h2 className="mb-2">
            More About Your Business
          </h2>
          <h5 className=" mb-8">
            Tell us about you and your business
          </h5>


          <form className="max-w-xl space-y-6" onSubmit={handleNext}>

            {/* Question 1: Current management method */}
            <div className="space-y-3">
              <label className="form-label">
                How are you managing your books right now?
              </label>
              <div className="space-y-2 pt-2">
                {managementOptions.map((option) => (
                  <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="managementMethod"
                      value={option.id}
                      checked={managementMethod === option.id}
                      onChange={() => setManagementMethod(option.id)}
                      className="h-4 w-4 text-[#002DF8] focus:ring-[#002DF8] border-gray-300"
                    />
                    <span className="text-[16px]  ">{option.label}</span>
                  </label>
                ))}
              </div>

              {/* AI Callout Banner */}
              {managementMethod && (
                <div className="mt-3 bg-green-100 border border-green-300 rounded-lg p-2.5 flex items-center gap-2 text-xs text-gray-800">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className='lg:text-[16px] text-[14px]'>Klara will help you migrate or start clean based on this.</span>
                </div>
              )}
            </div>

            {/* Question 2: Main goal */}
            <div className="space-y-3 pt-2">
              <label className="form-label">
                What's your main goal with Tractbook?
              </label>
              <div className="flex flex-wrap gap-2 pt-2">
                {goalOptions.map((goal) => {
                  const isSelected = mainGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setMainGoal(goal.id)}
                      className={`px-3 py-1.5 rounded-md text-[14px] lg:text-[16px] font-medium border transition-colors ${isSelected
                        ? 'bg-[#002DF8] text-white border-blue-600'
                        : 'bg-white text-gray-700 border-blue-200 hover:border-blue-400'
                        }`}
                    >
                      {goal.label}
                    </button>
                  );
                })}
              </div>

              {/* AI Callout Banner */}
              {mainGoal && (
                <div className="mt-3 bg-green-100 border border-green-300 rounded-lg p-2.5 flex items-center gap-2 text-xs text-gray-800">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className='lg:text-[16px] text-[14px]'>Klara will prioritise features based on this.</span>
                </div>
              )}
            </div>

            {/* Question 3: Team size */}
            <div className="space-y-3 pt-2">
              <label className="form-label">
                How big is your team?
              </label>
              <div className="flex gap-2 pt-2">
                {teamSizeOptions.map((size) => {
                  const isSelected = teamSize === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setTeamSize(size.id)}
                      className={`px-4 py-1.5 rounded-md text-[14px] lg:text-[16px] font-medium border transition-colors ${isSelected
                        ? 'bg-[#002DF8] text-white border-blue-600'
                        : 'bg-white text-gray-700 border-blue-200 hover:border-blue-400'
                        }`}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>

              {/* AI Callout Banner */}
              {teamSize && (
                <div className="mt-3 bg-green-100 border border-green-300 rounded-lg p-2.5 flex items-center gap-2 text-xs text-gray-800">
                  <span className='lg:text-[16px] text-[14px]'>Determines team collaboration and user seat features.</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
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
                disabled={!canSubmit}
                className="w-36 py-2.5 bg-[#002DF8] disabled:bg-blue-200 text-white font-medium text-sm rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
              >
                One Last Step
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Right Column - Graphic Placeholder */}
      <div className="hidden lg:block lg:w-1/2 bg-[#D1D5DB] border-l border-gray-200">
        {/* Placeholder side pane */}
      </div>

    </div>
  );
};

export default MoreAboutYourBusiness;
