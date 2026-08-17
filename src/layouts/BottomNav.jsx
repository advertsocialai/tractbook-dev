import { Link, useLocation } from "react-router-dom";
import { BOTTOM_NAV, findActiveSection } from "./navigation";

/**
 * Mobile / tablet bottom bar. It is a flex child of the full-height shell
 * rather than `position: fixed`, so it is always on screen without the
 * page content ever sliding underneath it.
 *
 * Active state is matched per section, so "Sales" stays lit on any of the
 * sales sub-pages rather than only on its landing route.
 */
const BottomNav = () => {
    const { pathname } = useLocation();
    const activeSection = findActiveSection(pathname);

    return (
        <nav className="shrink-0 border-t border-gray-200 bg-white lg:hidden">
            <div className="flex items-stretch justify-around">
                {BOTTOM_NAV.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection?.id === item.id;

                    return (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`flex flex-1 flex-col items-center gap-1 px-1 py-2.5 text-[11px] font-medium transition-colors ${isActive ? "text-brand-blue" : "text-gray-400"
                                }`}
                        >
                            <Icon className="h-5 w-5 shrink-0" />
                            <span className="truncate">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
