import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase/client";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 45;

const TEAM_TEST_EMAILS = [
    "rakeshchandra.chandra21@gmail.com",
    "kloroncanada@gmail.com",
];

function isAllowedTestUser(email) {
    if (!email) return false;
    const normalized = email.toLowerCase();
    if (normalized.endsWith("@nxtwave.ca")) return true;
    return TEAM_TEST_EMAILS.includes(normalized);
}

export default function OTPVerify() {
    const navigate = useNavigate();
    const location = useLocation();
    const incoming = location.state || {};
    const phone = incoming.phone || "+1 (000) 000-0000";

    const [otp, setOtp] = useState(new Array(CODE_LENGTH).fill(""));
    const [timer, setTimer] = useState(RESEND_SECONDS);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef([]);

    const showResend = timer <= 0;
    const showSkip = import.meta.env.DEV || isAllowedTestUser(incoming.email);

    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const goToNextStep = () => {
        if (incoming.existingUser) {
            navigate("/dashboard", {
                state: {
                    businessId: incoming.businessId,
                    businessName: incoming.businessName,
                    justCreated: false,
                },
            });
        } else {
            navigate("/role");
        }
    };

    const handleVerify = async (code) => {
        if (!incoming.fullPhone) {
            setError("Missing phone number — please go back and re-enter it.");
            return;
        }

        setVerifying(true);
        setError("");

        const { error: verifyError } = await supabase.auth.verifyOtp({
            phone: incoming.fullPhone,
            token: code,
            type: "phone_change",
        });

        setVerifying(false);

        if (verifyError) {
            setError("That code didn't match. Check it and try again.");
            setOtp(new Array(CODE_LENGTH).fill(""));
            inputRefs.current[0]?.focus();
            return;
        }

        goToNextStep();
    };

    const handleChange = (element, index) => {
        const digit = element.value.replace(/\D/g, "").slice(-1);
        const next = [...otp];
        next[index] = digit;
        setOtp(next);

        if (digit && index < CODE_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (next.every((d) => d !== "")) {
            handleVerify(next.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = async () => {
        setTimer(RESEND_SECONDS);
        setOtp(new Array(CODE_LENGTH).fill(""));
        setError("");
        inputRefs.current[0]?.focus();

        // Re-triggers the same phone_change OTP so a new SMS goes out.
        if (incoming.fullPhone) {
            await supabase.auth.updateUser({ phone: incoming.fullPhone });
        }
    };

    return (
        <div className="mainparent">
            <div className="lg:mb-14 mb-8">
                <img src="/logoblack.svg" alt="tractbook" className="h-10" />
            </div>

            <div className="mb-8">
                <h1 className="lg:mb-8 mb-4">Enter verification code</h1>
                <h5>
                    We sent a six digit code to <span className="font-bold text-black">{phone}.</span>
                    <span
                        onClick={() => navigate(-1)}
                        className="text-blue-600 ml-2 cursor-pointer font-medium"
                    >
                        Change
                    </span>
                </h5>
            </div>

            <div className="w-full max-w-[500px] flex flex-col items-center">
                <div className="flex gap-2 md:gap-4 mb-4">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            value={data}
                            disabled={verifying}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onFocus={(e) => e.target.select()}
                            className="w-12 h-16 md:w-16 md:h-16 border-2 border-[#d1d5db] rounded-xl text-center text-2xl font-bold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                    ))}
                </div>

                {error && (
                    <div className="text-red-500 text-[14px] mb-4 w-full text-left ml-4">
                        {error}
                    </div>
                )}

                {verifying && (
                    <div className="form-helper-text w-full text-left ml-4">
                        Verifying...
                    </div>
                )}

                <div className="form-helper-text w-full text-left ml-4">
                    Don't see it? Send a new code in 00:{timer < 10 ? `0${timer}` : timer}
                </div>

                {showResend && (
                    <button
                        onClick={handleResend}
                        className="social-signup-btn"
                    >
                        Send a new code
                    </button>
                )}

                {showSkip && (
                    <button
                        type="button"
                        onClick={goToNextStep}
                        className="form-helper-text underline text-center"
                    >
                        Skip for now (test mode)
                    </button>
                )}
            </div>

            <div className="mt-auto pb-10">
                <p className="form-helper-text text-center">
                    Your data is secure and won't be shared with anyone. Read the details in our{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline font-medium">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}
