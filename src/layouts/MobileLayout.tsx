import { Outlet } from "react-router-dom";
import "./mobile-layout.css";

/**
 * Phone-frame layout for the mobile app screens.
 *
 * This is opt-in: only routes nested under <Route element={<MobileLayout />}>
 * get the 391x844 desktop frame, the page gradient and the app heading scale.
 * Previously those rules lived in index.css and matched `#root > div` /
 * `.max-w-sm`, so they hit every page whether it wanted them or not.
 *
 * A page rendered outside this layout inherits only design tokens and the
 * base reset, and is free to define its own full-width design.
 */
export default function MobileLayout() {
  return (
    <div className="app-mobile">
      <div className="app-mobile__frame">
        <Outlet />
      </div>
    </div>
  );
}
