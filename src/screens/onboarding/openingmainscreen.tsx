import { Eye, EyeOff, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen text-white"
            style={{ background: "var(--bg-dark)" }}
        >
            <header className="fixed top-0 left-0 w-full z-50  backdrop-blur-2xl">
                <div className="max-w-7xl mx-auto px-6 h-[90px] flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src="/logo.svg" alt="Tractbook" className="h-9 w-auto" />
                    </div>

                    <nav className="hidden lg:flex items-center gap-8">
                        {/* <div className="flex items-center gap-6 text-[14px] font-medium text-gray-400 mr-4">
                            {["Dashboard", "Ledgers", "Invoicing", "Tract Report", "Expenses", "Tract Accountant"].map((item) => (
                                <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
                            ))}
                        </div> */}

                        <div className="flex items-center gap-4 text-white">
                            <button
                                onClick={() => navigate("/login")}
                                className="px-5 py-2 rounded-md border border-[#4FB33F] text-[#4FB33F] text-sm font-medium hover:bg-[#4FB33F]/10 transition-all"
                            >
                                Sign in
                            </button>

                            <button
                                onClick={() => navigate("/sign-up")}
                                className="px-5 py-2 rounded-md bg-gradient-to-r from-[#52B846] to-[#002DF8] text-sm hover:opacity-90 transition-all"
                            >
                                Sign up for free
                            </button>
                        </div>
                    </nav>

                    <button className="lg:hidden p-2 text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {menuOpen && (
                <div className="fixed inset-0 z-40 bg-slate-950 flex flex-col pt-[110px] px-8 space-y-6 lg:hidden overflow-y-auto">

                    {/* {["Dashboard", "Ledgers", "Invoicing", "Tract Report", "Expenses", "Tract Accountant"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-lg font-medium border-b border-white/5 pb-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))} */}

                    <div className="pt-4 space-y-4 pb-10">
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full py-3 rounded-xl border border-[#4FB33F] text-[#4FB33F] font-semibold hover:bg-[#4FB33F]/10">
                            Sign in
                        </button>
                        <button
                            onClick={() => navigate("/sign-up")}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#52B846] to-[#002DF8] font-bold hover:opacity-90 transition-all">
                            Sign up for free
                        </button>
                    </div>

                </div>
            )}

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-[140px] pb-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left Side: Text & Form */}
                <div className="max-w-4xl w-full mx-auto lg:mx-0">
                    <h1 className="text-[34px]  lg:text-[54px] font-bold leading-[1.3] mb-6 tracking-tight">
                        Financial control, built for growing businesses
                    </h1>
                    <p className="text-[16px] lg:text-[18px] mb-10 leading-relaxed">
                        Create invoices, track expenses, and stay compliant — all from one intelligent dashboard.
                    </p>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        {/* <div className="space-y-2">
                            <label className="text-[16px] font-medium  ml-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="e.g. daniel@company.com"
                                className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-white-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[16px] font-medium  ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-white-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div> */}

                        <button
                            onClick={() => navigate("/sign-up")}
                            className="btn-primary">
                            Create your free account
                        </button>

                        <div className="flex items-center my-6">
                            <div className="flex-1 h-px bg-gray-300"></div>

                            <span className="px-4 text-white-500 text-sm font-medium">
                                Or
                            </span>

                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={() => navigate("/sign-up")}
                                className="social-signup-btn">
                                <img
                                    src="/googlelogo.svg"
                                    className="w-9 h-9 p-0.5 absolute left-3 top-1/2 -translate-y-1/2"
                                    alt=""
                                />
                                <span className="block text-center text-[16px]">
                                    Sign up with Google
                                </span>

                            </button>
                            <button
                                onClick={() => navigate("/sign-up")}
                                className="microsoft-signup-btn">

                                <img
                                    src="/microsoftlogo.svg"
                                    className="w-8 h-8 absolute left-3 top-1/2 -translate-y-1/2"
                                    alt=""
                                />


                                <span className="block text-center text-[16px]">
                                    Sign up with Microsoft
                                </span>

                            </button>
                        </div>

                        <div className="flex items-start gap-3 mt-6">
                            {/* <input type="checkbox" id="terms" className="mt-1 accent-blue-500 h-4 w-4 rounded border-slate-700 bg-slate-900" /> */}
                            <label htmlFor="terms" className="text-[16px] text-slate-500 leading-normal">
                                By signing up, you are indicating that you have read and agree to the <br /> <a href="#" className="text-slate-300 hover:underline">Terms of Use</a> and <a href="#" className="text-slate-300 hover:underline">Privacy Policy</a>
                            </label>
                        </div>
                    </form>
                </div>

                {/* Right Side: Visual Asset */}
                <div className="hidden lg:block relative">
                    <div className="relative z-10 animate-float drop-shadow-[0_35px_35px_rgba(59,130,246,0.2)]">
                        <img
                            src="/mainpageright.svg"
                            alt="Dashboard Preview"
                            className="w-full h-auto"
                        />
                    </div>
                </div>

            </main>
        </div>
    );
}