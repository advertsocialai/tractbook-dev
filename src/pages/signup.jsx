import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
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

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        if (loading) return;

        // Email check
        const isEmailValid = email.includes("@") && email.includes(".");
        if (!isEmailValid) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        // Password validation check
        const isPasswordValid = validatePassword(password);

        if (password.length === 0) {
            setError("Please create a password first");
            return;
        }

        if (!isEmailValid || !isPasswordValid) return;

        setLoading(true);

        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/login`,
            },
        });

        setLoading(false);

        if (signUpError) {
            setError(signUpError.message);
            return;
        }

        if (!data.session) {
            // Email confirmation is required — Supabase already sent the
            // verification link. Show the confirmation screen and let the
            // user proceed manually once they've actually verified.
            setVerificationSent(true);
            return;
        }

        navigate("/security-phone-no");
    };

    const handleGoogleSignUp = async () => {
        setError("");
        const { error: oauthError } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/security-phone-no`,
            },
        });
        if (oauthError) setError(oauthError.message);
    };

    if (verificationSent) {
        return (
            <div className="mainparent">
                <div className="lg:mb-14 mb-8">
                    <img src="/logoblack.svg" alt="tractbook" className="h-10" />
                </div>

                <div className="md:text-center max-w-6xl mb-12">
                    <h1 className="lg:mb-8 mb-4">Verify your email .</h1>
                    <h5>
                        We sent a verification link to <span className="font-bold">{email}</span>. Click the link to activate your account, then sign in to continue.
                    </h5>
                </div>

                <div className="w-full max-w-[440px]">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="btn-primary text-[white] bg-[#545454] ">
                        Go to Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mainparent">
            <div className="lg:mb-14 mb-8">
                <img src="/logoblack.svg" alt="tractbook" className="h-10" />
            </div>

            <div className="md:text-center max-w-6xl mb-12">
                <h1 className="lg:mb-8 mb-4">Your financial clarity starts here .</h1>
                <h5>
                    Tractbook helps freelancers, consultants, and small businesses around the world simplify their finances
                </h5>
            </div>

            <div className="w-full max-w-[440px]">
                <form className="space-y-4" onSubmit={handleCreateAccount}>
                    <label className="block text-[16px] font-medium mb-1">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError(false);
                        }}
                        placeholder="Enter Your E-mail"
                        className={`global-input ${emailError ? "input-error" : ""}`}
                    />
                    <label className="block text-[16px] font-medium mb-1">Password</label>
                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Create a password"
                            className={`global-input ${error ? "border-red-500" : "border-gray-300"} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none`}
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
                        disabled={loading}
                        className="btn-primary text-[white] bg-[#545454] ">
                        {loading ? "Creating your account..." : "Create your free account"}
                    </button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-light-grey"></div>
                        <span className="flex-shrink mx-4 text-[16px] text-grey-text">or</span>
                        <div className="flex-grow border-t border-light-grey"></div>
                    </div>

                    <div className="space-y-3">
                        <button type="button" onClick={handleGoogleSignUp} className="social-signup-btn">
                            <img src="/googlelogo.svg" className="w-9 h-9 p-0.5 absolute left-3 top-1/2 -translate-y-1/2" alt="" />
                            <span className="block text-center">Sign up with Google</span>
                        </button>
                        <button type="button" className="microsoft-signup-btn">
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
