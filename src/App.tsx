import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./screens/onboarding/Welcome";
import SignUp from "./screens/onboarding/SignUp";
import SignIn from "./screens/onboarding/SignIn";
import ForgotPassword from "./screens/onboarding/ForgotPassword";
import ResetPassword from "./screens/onboarding/ResetPassword";
import VerifyPhone from "./screens/onboarding/VerifyPhone";
import VerifyCode from "./screens/onboarding/VerifyCode";
import Loading from "./screens/onboarding/Loading";
import RoleSelect from "./screens/onboarding/RoleSelect";
import BusinessInfo from "./screens/onboarding/BusinessInfo";
import TaxDetails from "./screens/onboarding/TaxDetails";
import Industry from "./screens/onboarding/Industry";
import BusinessContext from "./screens/onboarding/BusinessContext";
import InviteAccountant from "./screens/onboarding/InviteAccountant";
import Dashboard from "./screens/onboarding/Dashboard";
import ComingSoon from "./screens/onboarding/ComingSoon";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-phone" element={<VerifyPhone />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/role" element={<RoleSelect />} />
      <Route path="/business-info" element={<BusinessInfo />} />
      <Route path="/tax-details" element={<TaxDetails />} />
      <Route path="/industry" element={<Industry />} />
      <Route path="/business-context" element={<BusinessContext />} />
      <Route path="/invite-accountant" element={<InviteAccountant />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/coming-soon/:feature" element={<ComingSoon />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
