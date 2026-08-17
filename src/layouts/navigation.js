import {
    LayoutDashboard,
    Receipt,
    CreditCard,
    ArrowLeftRight,
    ScanLine,
    PieChart,
    Tag,
    Scale,
    Wallet,
} from "lucide-react";

/**
 * Single source of truth for the app navigation.
 * The desktop sidebar, the mobile bottom bar and the mobile sub-tabs
 * are all rendered from this list, so a section only has to be added once.
 *
 * `icon` values are placeholders — swap them for real assets later.
 */
export const NAV_SECTIONS = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        children: [],
    },
    {
        id: "sales",
        label: "Sales & Get paid",
        icon: Receipt,
        path: "/sales/overview",
        children: [
            { label: "Overview", path: "/sales/overview" },
            { label: "Estimate", path: "/sales/estimate" },
            { label: "Invoice", path: "/sales/invoice" },
        ],
    },
    {
        id: "expenses",
        label: "Expense",
        icon: CreditCard,
        path: "/expenses/vendors",
        children: [
            { label: "Vendors", path: "/expenses/vendors" },
            { label: "Bills", path: "/expenses/bills" },
        ],
    },
    {
        id: "transaction",
        label: "Transaction",
        icon: ArrowLeftRight,
        path: "/transaction/transactions",
        children: [
            { label: "Transactions", path: "/transaction/transactions" },
            { label: "Chart of accounts", path: "/transaction/chart-of-accounts" },
            { label: "Payments", path: "/transaction/payments" },
        ],
    },
    {
        id: "ocr",
        label: "OCR",
        icon: ScanLine,
        path: "/ocr/ar-agent",
        children: [
            { label: "Tract AR Agent", path: "/ocr/ar-agent" },
            { label: "Tract Ap Agent", path: "/ocr/ap-agent" },
        ],
    },
];

/**
 * Condensed bar shown only on small screens. Labels are shortened to fit,
 * and each entry lands on its section's first page.
 */
export const BOTTOM_NAV = [
    { id: "dashboard", label: "Dashboard", icon: PieChart, path: "/dashboard" },
    { id: "sales", label: "Sales", icon: Tag, path: "/sales/overview" },
    { id: "expenses", label: "Expenses", icon: Wallet, path: "/expenses/vendors" },
    { id: "transaction", label: "Accounting", icon: Scale, path: "/transaction/transactions" },
    { id: "ocr", label: "OCR", icon: ScanLine, path: "/ocr/ar-agent" },
];

/** Every route that lives inside the app shell (header + sidebar / bottom bar). */
export const APP_ROUTE_PREFIXES = [
    "/dashboard",
    "/sales",
    "/expenses",
    "/transaction",
    "/ocr",
    "/settings",
];

export function isAppRoute(pathname) {
    return APP_ROUTE_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );
}

/** The section that owns the current URL, or undefined on non-section routes. */
export function findActiveSection(pathname) {
    return NAV_SECTIONS.find(
        (section) =>
            pathname === section.path ||
            pathname.startsWith(`/${section.id}/`) ||
            pathname === `/${section.id}`
    );
}
