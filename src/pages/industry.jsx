import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";

const IndustrySelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const priorState = location.state || {};

  // State to track selected industry
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const industries = [
    {
      id: 'construction',
      title: 'Construction & Real Estate',
      description: 'Progress billing, holdback, lien tracking, job costing.',
    },
    {
      id: 'retail',
      title: 'Retail & E-commerce',
      description: 'Products, inventory, online store, point of sale.',
    },
    {
      id: 'professional',
      title: 'Professional Services',
      description: 'Consulting, legal, tech, agencies, creative.',
    },
    {
      id: 'health',
      title: 'Health & Wellness',
      description: 'Clinics, therapy, fitness, personal care.',
    },
    {
      id: 'trades',
      title: 'Trades & Field Service',
      description: 'Plumbing, HVAC, electrical, landscaping.',
    },
    {
      id: 'other',
      title: 'Other',
      description: "My industry isn't listed here.",
    },
  ];

  const handleNext = () => {
    if (!selectedIndustry) return;
    navigate("/business-context", {
      state: { ...priorState, industry: selectedIndustry },
    });
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900 overflow-hidden">

      {/* Left Column - Form */}
      <div className="w-full lg:w-1.3/2 flex flex-col p-8 md:p-12 lg:p-16 xl:px-24">
        <div className='max-w-xl'>


          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
            <div className="h-full bg-gradient-to-r from-blue-600 to-green-400 rounded-full w-3/5"></div>
          </div>

          {/* Header */}
          <h2 className="mb-2">
            What Industry are you In?
          </h2>
          <h5 className=" mb-8">
            This personalises your invoices, tax settings and Klara AI for your business type.
          </h5>

          {/* Alert/Info Box */}
          <div className="max-w-xl bg-green-100 border border-green-300 rounded-lg p-3.5 flex items-start gap-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
            <p className="lg:text-[16px] text-[14px] text-[#000000] leading-relaxed">
              Klara will set up your HST rates, invoice templates and workflow automations based on your industry — no manual configuration needed.
            </p>
          </div>

          {/* Industry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mb-10">
            {industries.map((item) => {
              const isSelected = selectedIndustry === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedIndustry(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[105px] ${isSelected
                    ? 'bg-[#002DF8] text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div>
                    <h3 className={`font-[700] text-[18px] mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-[14px]  ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between max-w-lg mt-auto pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-32 py-2.5 bg-gray-400 text-white font-medium text-sm rounded-lg hover:bg-gray-500 transition-colors shadow-sm"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedIndustry}
              className="w-36 py-2.5 bg-[#002DF8] disabled:bg-blue-200 text-white font-medium text-sm rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
            >
              Next
            </button>
          </div>

        </div>



      </div>
      {/* Right Column - Placeholder Graphic Side */}
      <div className="hidden lg:block lg:w-1/2 bg-[#D1D5DB] border-l border-gray-200">
        {/* Placeholder graphic container */}
      </div>
    </div>
  );
};

export default IndustrySelection;
