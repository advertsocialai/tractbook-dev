import { useState } from 'react';
import { Briefcase, FileSpreadsheet, FileText, HelpCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
    const [activeRole, setActiveRole] = useState('business_owner');
    const navigate = useNavigate();

    const roles = [
        {
            id: 'business_owner',
            title: 'Business Owner',
            description: 'Manage accounting for your own company.',
            icon: '/role2.svg',
            buttonText: 'Continue as Business Owner',
            available: true,
        },
        {
            id: 'accountant',
            title: 'Accountant',
            description: 'Manage books for multiple client companies.',
            icon: '/role2.svg', buttonText: 'Continue as Accountant',
            available: false,
        },
        {
            id: 'freelancer',
            title: 'Solo/freelancer',
            description: 'I work independently and invoice my clients.',
            icon: '/role1.svg', buttonText: 'Continue as Solo/freelancer',
            badge: 'New',
            available: false,
        },
    ];

    const handleBusinessOwner = () => {
        navigate("/business-info");
    };

    // Only the Business Owner path is built out — the other roles stay inert.
    const handleContinue = (role) => {
        if (role.id === 'business_owner') {
            handleBusinessOwner();
        }
    };

    return (
        <>
            <div className="mainparent">
                <div className="lg:mb-14 mb-8">
                    <img src="/logoblack.svg" alt="tractbook" className="h-10" />
                </div>

                <div className="md:text-center max-w-6xl mb-12">
                    <h1 className="lg:mb-8 mb-4">How will you use Tractbook?</h1>
                    <h5>
                        Choose the setup that fits your needs.
                    </h5>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-12">
                    {roles.map((role) => {
                        const isActive = activeRole === role.id;

                        return (
                            <div
                                key={role.id}
                                onClick={() => setActiveRole(role.id)}
                                className={`flex flex-col w-full md:w-64 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${isActive ? 'border-blue-600' : 'border-[#B1BFFE] hover:border-indigo-200'
                                    }`}
                            >
                                {/* Icon */}
                                <div className="mb-4">
                                    <img src={role.icon} alt="img" />
                                    
                                </div>

                                {/* Title & Badge */}
                                <div className="flex items-center mb-2">
                                    <h4 className="">{role.title}</h4>
                                    {role.badge && (
                                        <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-500 text-xs font-semibold rounded">
                                            {role.badge}
                                        </span>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-[16px] text-[#545454] mb-8 flex-grow leading-relaxed">
                                    {role.description}
                                </p>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleContinue(role)}
                                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive
                                        ? 'bg-[#002DF8] text-white'
                                        : 'bg-indigo-200 text-indigo-500 hover:bg-indigo-300'
                                        }`}
                                >
                                    {role.buttonText}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl border border-[#B4B4B4] rounded-xl px-6 py-4 shadow-sm mb-6">
                    <div className="flex items-center  mb-4 sm:mb-0">
                        <HelpCircle size={20} className=" mr-3" />
                        <span className="text-sm font-semibold">Confused about which role to pick?</span>
                    </div>
                    <button className="px-6 py-2 border border-[#B4B4B4] text-blue-600 font-semibold text-sm rounded-lg hover:bg-blue-50 transition-colors">
                        View Guide
                    </button>
                </div>


            </div>

        </>
    );
}
