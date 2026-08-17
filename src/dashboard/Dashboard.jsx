import { Receipt, Users, CreditCard, Calculator } from "lucide-react";

const QUICK_ACTIONS = [
    { id: "upload", label: "Upload your reciept", icon: Receipt },
    { id: "customers", label: "Add customers", icon: Users },
    { id: "payments", label: "Accept payments", icon: CreditCard },
    { id: "estimates", label: "Create estimates", icon: Calculator },
];

const Dashboard = () => {
    return (
        <div className="flex min-h-full flex-col items-center px-4 py-10 sm:px-6 lg:py-16">

            {/* Heading */}
            <h1 className="text-center text-[28px] font-extrabold tracking-tight text-black sm:text-[34px] lg:text-[40px]">
                Capture your Reciept
            </h1>

            <p className="mt-3 text-center text-base text-gray-300 sm:text-lg">
                It&apos;s more than just a way to say &ldquo;pay me&rdquo;
            </p>

            <p className="mt-5 max-w-xl text-center text-[13px] leading-relaxed text-gray-500">
                The care and detail you put into invoicing can do wonders for your brand and future business
                <br className="hidden sm:block" />
                Take these quick actions to show customers the best you have to offer.
            </p>

            {/* Quick action cards */}
            <div className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {QUICK_ACTIONS.map((action) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.id}
                            type="button"
                            className="flex min-h-[120px] flex-col justify-between rounded-xl border border-gray-200 p-4 text-left transition-all hover:border-gray-300 hover:shadow-sm sm:min-h-[135px]"
                        >
                            <Icon className="h-7 w-7 shrink-0 text-brand-blue-dark" strokeWidth={1.75} />
                            <span className="mt-4 text-[13px] font-bold leading-snug text-gray-900 sm:text-sm">
                                {action.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                className="mt-6 text-[13px] font-medium text-brand-blue-mid hover:underline"
            >
                Choose a different starting point
            </button>
        </div>
    );
};

export default Dashboard;
