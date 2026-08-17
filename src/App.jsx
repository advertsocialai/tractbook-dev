import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import MainScreen from "./pages/mainscreen";
import Login from "./pages/login";
import Loader from "./layouts/loader";
import SecurityPhoneNo from "./pages/securityphoneno";
import OTPVerify from "./pages/otpverify";
import Signup from "./pages/signup";
import Role from "./pages/role";
import Bussinessinfo from "./pages/Bussiness-info";
import Taxdetails from "./pages/tax-deatils";
import Industry from "./pages/industry";
import BusinessContext from "./pages/business-context";
import InviteAccountant from "./pages/invite-accountant";

import AppLayout from "./layouts/AppLayout";
import { isAppRoute } from "./layouts/navigation";

import Dashboard from "./dashboard/Dashboard";
import Overview from "./sales/Overview";
import Estimate from "./sales/Estimate";
import Invoice from "./sales/Invoice";
import Vendors from "./expenses/Vendors";
import Bills from "./expenses/Bills";
import Transactions from "./transistion/Transactions";
import ChartOfAccounts from "./transistion/ChartOfAccounts";
import Payments from "./transistion/Payments";
import TractArAgent from "./ocr/TractArAgent";
import TractApAgent from "./ocr/TractApAgent";
import Setting from "./setting/Setting";

function AppContent() {
  const location = useLocation();

  // The onboarding flow shows a full-screen loader between steps. Inside the
  // app shell navigation is instant, so the loader is skipped there.
  const inAppShell = isAppRoute(location.pathname);

  // Tracks the last route that finished its loader delay. Deriving `isLoading`
  // from it keeps the only setState inside the timeout callback rather than in
  // the effect body, which would cause a cascading render.
  const [settledKey, setSettledKey] = useState(null);
  const isLoading = !inAppShell && settledKey !== location.key;

  useEffect(() => {
    if (inAppShell) return undefined;

    const timer = setTimeout(() => {
      setSettledKey(location.key);
    }, 800);

    return () => clearTimeout(timer);
  }, [location, inAppShell]);

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        {/* Public / onboarding */}
        <Route path="/" element={<MainScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/security-phone-no" element={<SecurityPhoneNo />} />
        <Route path="/otp-verify" element={<OTPVerify />} />
        <Route path="/role" element={<Role />} />
        <Route path="/business-info" element={<Bussinessinfo />} />
        <Route path="/tax-details" element={<Taxdetails />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/business-context" element={<BusinessContext />} />
        <Route path="/invite-accountant" element={<InviteAccountant />} />

        {/* App shell — header + sidebar / bottom bar stay mounted across these */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/sales" element={<Navigate to="/sales/overview" replace />} />
          <Route path="/sales/overview" element={<Overview />} />
          <Route path="/sales/estimate" element={<Estimate />} />
          <Route path="/sales/invoice" element={<Invoice />} />

          <Route path="/expenses" element={<Navigate to="/expenses/vendors" replace />} />
          <Route path="/expenses/vendors" element={<Vendors />} />
          <Route path="/expenses/bills" element={<Bills />} />

          <Route path="/transaction" element={<Navigate to="/transaction/transactions" replace />} />
          <Route path="/transaction/transactions" element={<Transactions />} />
          <Route path="/transaction/chart-of-accounts" element={<ChartOfAccounts />} />
          <Route path="/transaction/payments" element={<Payments />} />

          <Route path="/ocr" element={<Navigate to="/ocr/ar-agent" replace />} />
          <Route path="/ocr/ar-agent" element={<TractArAgent />} />
          <Route path="/ocr/ap-agent" element={<TractApAgent />} />

          <Route path="/settings" element={<Setting />} />
        </Route>
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
