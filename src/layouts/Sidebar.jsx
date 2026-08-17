import { NavLink } from "react-router-dom";
import { NAV_SECTIONS } from "./navigation";

const subItemClass = ({ isActive }) =>
    `block rounded-md px-3 py-1.5 text-[13px] transition-colors ${isActive
        ? "bg-[#e8edfd] font-semibold text-brand-blue"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    }`;

/**
 * Desktop sidebar. Hidden below `lg` — the bottom bar takes over there.
 */
const Sidebar = () => {
    return (
        <aside className="hidden w-60 shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
            <nav className="flex-1 overflow-y-auto px-3 py-4">
                {NAV_SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const hasChildren = section.children.length > 0;

                    return (
                        <div key={section.id} className="mb-3">
                            {hasChildren ? (
                                // Group heading — not a link, the children are the targets.
                                <div className="flex items-center gap-2.5 px-3 py-1.5 text-[13px] font-semibold text-gray-800">
                                    <Icon className="h-4 w-4 shrink-0 text-gray-600" />
                                    <span>{section.label}</span>
                                </div>
                            ) : (
                                <NavLink
                                    to={section.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors ${isActive
                                            ? "bg-[#e8edfd] text-brand-blue"
                                            : "text-gray-800 hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    <span>{section.label}</span>
                                </NavLink>
                            )}

                            {hasChildren && (
                                <div className="mt-1 space-y-0.5 pl-6">
                                    {section.children.map((child) => (
                                        <NavLink key={child.path} to={child.path} className={subItemClass}>
                                            {child.label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer promo */}
            <div className="shrink-0 px-6 py-6">
                <p className="text-[11px] leading-snug text-gray-500">
                    Accept credit cards &amp; bank payments
                </p>
                <button
                    type="button"
                    className="mt-2 text-[13px] font-medium text-brand-blue-mid hover:underline"
                >
                    Set up now
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
