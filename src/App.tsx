import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./screens/onboarding/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      {/* Next screens will be added here one by one:
          /sign-up, /verify-phone, /verify-code, /role, /business-info, ... */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
