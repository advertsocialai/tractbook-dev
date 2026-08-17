import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { findActiveSection } from "./navigation";

/**
 * Sub-page tabs for small screens.
 *
 * The desktop sidebar exposes every sub-page directly; the mobile bottom bar
 * only has room for the five sections, so this strip keeps the sub-pages
 * reachable on phones and tablets.
 */
const MobileSectionTabs = () => {
    const { pathname } = useLocation();
    const section = findActiveSection(pathname);

    if (!section || section.children.length === 0) return null;

    return (
        <div className="border-b border-gray-200 bg-white lg:hidden">
            <div className="flex gap-1 overflow-x-auto px-4 py-2">
                {section.children.map((child) => (
                    <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                            `shrink-0 rounded-md px-3 py-1.5 text-[13px] transition-colors ${isActive
                                ? "bg-[#e8edfd] font-semibold text-brand-blue"
                                : "text-gray-500 hover:bg-gray-50"
                            }`
                        }
                    >
                        {child.label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

/**
 * Persistent app shell.
 *
 * Desktop : header on top, sidebar on the left, page in the remaining area.
 * Mobile  : header on top, page in the middle, bottom bar pinned below.
 *
 * The outer wrapper is exactly one viewport tall and only `<main>` scrolls,
 * so the header and bottom bar never leave the screen.
 */
const AppLayout = () => {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-white font-sans text-gray-900">
            <Header />

            <div className="flex min-h-0 flex-1">
                <Sidebar />

                <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
                    <MobileSectionTabs />
                    <div className="flex-1 overflow-y-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            <BottomNav />
        </div>
    );
};

export default AppLayout;
