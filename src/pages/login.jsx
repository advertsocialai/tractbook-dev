import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (value) => {
        const numCount = (value.match(/\d/g) || []).length;
        const hasSpecial = /[%\$#!() ]/.test(value);

        if (value.length > 0 && (numCount < 4 || !hasSpecial)) {
            setError("Uh oh, this password isn't strong enough");
            return false;
        } else if (value.length === 0) {
            setError("");
            return false;
        } else {
            setError("");
            return true;
        }
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        validatePassword(val);
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();

        // Email check
        const isEmailValid = email.includes("@") && email.includes(".");
        if (!isEmailValid) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        // Password validation check
        const isPasswordValid = validatePassword(password);

        // Redirect only if both are valid
        if (isEmailValid && isPasswordValid && password.length > 0) {
            navigate("/security-phone-no");
        } else if (password.length === 0) {
            setError("Please create a password first");
        }
    };

    return (
        <div className="min-h-screen bg-white text-dark-primary flex flex-col items-center pt-10 px-6">
            <div className="mb-14">
                <img src="/logoblack.svg" alt="tractbook" className="h-10" />
            </div>

            <div className="text-center max-w-6xl mb-12">
                <h1 className="text-[22px] md:text-[64px] font-bold mb-8">Your financial clarity starts here .</h1>
                <p className="text-[#545454] text-[16px] px-4 md:text-[20px]" >
                    Tractbook helps freelancers, consultants, and small businesses <br />around the world simplify their finances
                </p>
            </div>

            <div className="w-full max-w-[440px]">
                <form className="space-y-4" onSubmit={handleCreateAccount}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError(false);
                        }}
                        placeholder="Enter Your E-mail"
                        className={`w-full px-4 py-3.5 rounded-xl bg-transparent border ${emailError ? "border-red-500" : "border-gray-300"} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none`}
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Create a password"
                            className={`w-full px-4 py-3.5 rounded-xl bg-transparent border ${error ? "border-red-500" : "border-gray-300"} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-bold"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="min-h-[20px]">
                        {error ? (
                            <p className="text-red-500 text-[13px] font-medium ml-1">
                                {error}
                            </p>
                        ) : (
                            <p className="text-gray-400 text-[13px] ml-1">
                                At least 4 numbers and a special character (%$#!())
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-[#545454] text-white rounded-lg font-medium text-[16px] hover:opacity-90 transition-all mt-2">
                        Create your free account
                    </button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-light-grey"></div>
                        <span className="flex-shrink mx-4 text-[16px] text-grey-text">or</span>
                        <div className="flex-grow border-t border-light-grey"></div>
                    </div>

                    <div className="space-y-3">
                        <button type="button" className="relative w-full py-3 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold transition-all">
                            <img src="/googlelogo.svg" className="w-9 h-9 p-0.5 absolute left-3 top-1/2 -translate-y-1/2" alt="" />
                            <span className="block text-center">Sign up with Google</span>
                        </button>
                        <button type="button" className="relative w-full py-3.5 rounded-xl bg-[#4ade80] text-slate-950 hover:bg-emerald-400 font-semibold transition-all">
                            <img src="/microsoftlogo.svg" className="w-8 h-8 absolute left-3 top-1/2 -translate-y-1/2" alt="" />
                            <span className="block text-center">Sign up with Microsoft</span>
                        </button>
                    </div>

                    <div className="flex items-start gap-3 mt-8">
                        <input type="checkbox" id="terms" required className="mt-1 accent-blue-500 h-4 w-4 rounded border-slate-700 bg-slate-900" />
                        <label htmlFor="terms" className="text-[14px] text-dark-primary font-bold leading-tight">
                            By signing up, you are indicating that you have read and agree to the <span className="underline cursor-pointer">Terms of Use</span> and <span className="underline cursor-pointer">Privacy Policy</span>
                        </label>
                    </div>

                    <p className="text-center text-[14px] font-medium pt-4 pb-10">
                        Already have an account? <Link to="/login" className="font-bold hover:underline">Sign in now.</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}