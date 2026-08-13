import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import MainScreen from "./pages/mainscreen";
import Login from "./pages/login";
import Loader from "./layouts/loader";
import SecurityPhoneNo from "./pages/securityphoneno";
import OTPVerify from "./pages/otpverify";

function AppContent() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/security-phone-no" element={<SecurityPhoneNo />} />
        <Route path="/otp-verify" element={<OTPVerify />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;