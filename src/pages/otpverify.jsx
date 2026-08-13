import { useState, useEffect, useRef } from "react";

export default function OTPVerify() {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(30);
    const [showResend, setShowResend] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setShowResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus();
        }
    };

    const handleResend = () => {
        setTimer(30);
        setShowResend(false);
        setOtp(new Array(6).fill(""));
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-10 px-6">
            <div className="mb-20">
                <img src="/logoblack.svg" alt="tractbook" className="h-8" />
            </div>

            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-[40px] font-bold text-black mb-4">Enter verification code</h1>
                <p className="text-gray-500 text-lg">
                    We sent a six digit code to <span className="font-bold text-black">+1 (162) 826-7904.</span>
                    <span className="text-blue-600 ml-2 cursor-pointer font-medium">Change</span>
                </p>
            </div>

            <div className="w-full max-w-[500px] flex flex-col items-center">
                <div className="flex gap-2 md:gap-4 mb-4">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            className="w-12 h-16 md:w-16 md:h-16 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                    ))}
                </div>

                <div className="text-gray-400 text-sm mb-8 w-full text-left ml-4">
                    Don't see it? Send a new code in 00:{timer < 10 ? `0${timer}` : timer}
                </div>

                {showResend && (
                    <button
                        onClick={handleResend}
                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-[16px] hover:bg-blue-500 transition-all animate-in fade-in slide-in-from-bottom-2"
                    >
                        Send a new code
                    </button>
                )}
            </div>

            <div className="mt-auto pb-10">
                <p className="text-[12px] text-gray-400 text-center">
                    Your data is secure and won't be shared with anyone. Read the details in our{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline font-medium">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}