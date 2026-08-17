import { Link } from "react-router-dom";
import { Upload, Settings } from "lucide-react";

/**
 * App header. Stays fixed at the top of the shell on every screen size.
 */
const Header = () => {
    return (
        <header className="shrink-0 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
                {/* Logo */}
                <Link to="/dashboard" className="flex shrink-0 items-center">
                    <img src="/logoblack.svg" alt="tractbook" className="h-6 sm:h-7" />
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-full bg-[#1a1919] px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-black sm:px-3.5 sm:text-xs"
                    >
                        <Upload className="h-3.5 w-3.5 shrink-0" />
                        <span className="hidden sm:inline">Upload Reciept</span>
                    </button>

                    <Link
                        to="/settings"
                        className="flex items-center gap-1.5 rounded-full bg-[#1a1919] px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-black sm:px-3.5 sm:text-xs"
                    >
                        <Settings className="h-3.5 w-3.5 shrink-0" />
                        <span className="hidden sm:inline">Setting</span>
                    </Link>

                    <button
                        type="button"
                        aria-label="Account"
                        className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-300 ring-1 ring-gray-200"
                    >
                        <span className="flex h-full w-full items-center justify-center text-xs font-bold text-gray-600">
                            T
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
