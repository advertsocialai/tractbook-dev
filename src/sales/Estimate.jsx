import { Fragment, useState } from "react";
import {
    Calendar,
    ChevronDown,
    ChevronRight,
    Clock,
    Globe,
    MoreVertical,
    Plus,
    Printer,
    Share2,
    Sparkles,
    X,
} from "lucide-react";

/* ---------------------------------------------------------------------------
   Static screen data. Swap these for API results once the endpoints exist —
   the markup below only reads from them, never from anything hard-coded.
--------------------------------------------------------------------------- */

const FUNNEL_STAGES = [
    {
        id: "create",
        title: "Create a new estimate",
        hint: "Send estimates and get approvals faster",
        tone: "blue",
    },
    { id: "draft", title: "Draft", amount: "$9,909.75", tone: "green" },
    { id: "sent", title: "Sent", amount: "$0.00", tone: "green" },
    { id: "accepted", title: "Accepted", amount: "$0.00", tone: "blue", highlighted: true },
];

const STATUS_FILTERS = ["All", "Draft", "Sent", "Accepted"];

const DATE_RANGES = ["Last 3 months", "This month", "Last 6 months"];

const ESTIMATES = [
    {
        id: "1039",
        date: "1/6/26",
        customer: "Amy's Bird Sanctuary",
        amount: "$54.75",
        status: { label: "Overdue 31 days", sub: "", tone: "overdue" },
        score: "High",
    },
    {
        id: "1040",
        date: "1/6/26",
        customer: "Mr Rakesh Chandra Talakaturi",
        amount: "$9,855.00",
        status: { label: "Overdue 41 days", sub: "Sent", tone: "overdue" },
        score: "Medium",
    },
    {
        id: "1041",
        date: "2/26/26",
        customer: "Ms Pranalika Chadaru",
        amount: "$54.75",
        status: { label: "Due in 16 days", sub: "Sent", tone: "due" },
        score: "Low",
    },
];

const SCORE_STYLES = {
    High: "bg-[#4fb33f] text-white",
    Medium: "bg-[#f0a63a] text-white",
    Low: "bg-[#e0645f] text-white",
};

const STAGE_BORDERS = {
    blue: "border-brand-blue",
    green: "border-brand-success",
};

/* ------------------------------------------------------------------------ */

const Estimate = () => {
    const [showBanner, setShowBanner] = useState(true);
    const [status, setStatus] = useState("Sent");
    const [dateRange, setDateRange] = useState("Last 3 months");
    const [selected, setSelected] = useState([]);

    const allSelected = selected.length === ESTIMATES.length;

    const toggleAll = () =>
        setSelected(allSelected ? [] : ESTIMATES.map((estimate) => estimate.id));

    const toggleRow = (id) =>
        setSelected((current) =>
            current.includes(id) ? current.filter((rowId) => rowId !== id) : [...current, id]
        );

    return (
        <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            {/* Klara suggestion banner */}
            {showBanner && (
                <div className="flex items-start gap-3 rounded-lg border border-brand-blue-light bg-[#f6f8ff] px-3 py-2.5 sm:px-4">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2} />
                    <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-bold leading-snug text-brand-blue">
                            Klara suggests
                        </p>
                        <p className="mt-0.5 text-[13px] leading-snug text-gray-600">
                            3 estimates expiring this week{" "}
                            <button
                                type="button"
                                className="font-semibold text-brand-blue underline-offset-2 hover:underline"
                            >
                                send reminders now
                            </button>{" "}
                            before they lapse.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowBanner(false)}
                        aria-label="Dismiss suggestion"
                        className="shrink-0 rounded p-0.5 text-gray-400 transition-colors hover:bg-white hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            <h1 className="mt-5 text-lg font-extrabold tracking-tight text-black sm:text-xl">
                Estimates Overview
            </h1>

            <h2 className="mt-4 text-[13px] font-semibold text-gray-600 sm:text-sm">
                Estimates at a Glance
            </h2>

            {/* Estimate funnel */}
            <section className="mt-2 rounded-xl border border-gray-200 p-3 sm:p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                    Estimate Funnel
                </p>

                <div className="mt-3 flex flex-col gap-2 xl:flex-row xl:items-stretch xl:gap-0">
                    {FUNNEL_STAGES.map((stage, index) => (
                        <Fragment key={stage.id}>
                            <button
                                type="button"
                                className={`flex min-h-[92px] flex-1 flex-col justify-between rounded-lg border-2 p-3 text-left transition-shadow hover:shadow-sm sm:min-h-[104px] ${STAGE_BORDERS[stage.tone]
                                    } ${stage.highlighted ? "bg-[#eef2ff]" : "bg-white"}`}
                            >
                                <span className="text-[13px] font-semibold text-gray-900">
                                    {stage.title}
                                </span>
                                {stage.amount ? (
                                    <span className="mt-2 text-lg font-extrabold text-black sm:text-xl">
                                        {stage.amount}
                                    </span>
                                ) : (
                                    <span className="mt-2 text-[11px] leading-snug text-gray-500">
                                        {stage.hint}
                                    </span>
                                )}
                            </button>

                            {index < FUNNEL_STAGES.length - 1 && (
                                <div className="flex items-center justify-center text-gray-400 xl:px-1.5">
                                    <ChevronDown className="h-4 w-4 xl:hidden" />
                                    <ChevronRight className="hidden h-4 w-4 xl:block" />
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </section>

            {/* Filters — status on the left, date range on the right */}
            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-[11px] font-medium text-gray-500">Status:</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {STATUS_FILTERS.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setStatus(option)}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${status === option
                                        ? "bg-black text-white"
                                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:text-right">
                    <p className="text-[11px] font-medium text-gray-500">Date Range:</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5 lg:justify-end">
                        {DATE_RANGES.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setDateRange(option)}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${dateRange === option
                                        ? "bg-black text-white"
                                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                        <button
                            type="button"
                            className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                        >
                            Custom Range
                            <Calendar className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <SplitButton label="Add Customer" icon={Plus} />
                    <SplitButton label="Batch actions" />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        className="text-xs font-medium text-gray-600 hover:text-gray-900"
                    >
                        Import Customers
                    </button>
                    <div className="flex overflow-hidden rounded-md">
                        <button
                            type="button"
                            className="bg-brand-success px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-success-alt"
                        >
                            Create Estimate
                        </button>
                        <span className="w-px bg-white/40" />
                        <button
                            type="button"
                            aria-label="More create options"
                            className="flex items-center bg-brand-success px-2 text-white transition-colors hover:bg-brand-success-alt"
                        >
                            <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Estimates table.
                The card clips the corners and the inner wrapper scrolls
                horizontally, so the table keeps its full column set on phones
                instead of squeezing the content. */}
            <section className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                                <th className="w-10 px-3 py-3">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        onChange={toggleAll}
                                        aria-label="Select all estimates"
                                        className="form-checkbox"
                                    />
                                </th>
                                <th className="px-3 py-3 font-bold">Date</th>
                                <th className="px-3 py-3 font-bold">No.</th>
                                <th className="px-3 py-3 font-bold">Customer</th>
                                <th className="px-3 py-3 font-bold">Amount</th>
                                <th className="px-3 py-3 font-bold">Status</th>
                                <th className="px-3 py-3 font-bold">Klara Score</th>
                                <th className="px-3 py-3 font-bold">
                                    <span className="flex items-center gap-2">
                                        Action
                                        <span className="flex items-center gap-1.5 text-gray-400">
                                            <Printer className="h-3.5 w-3.5" />
                                            <Globe className="h-3.5 w-3.5" />
                                            <MoreVertical className="h-3.5 w-3.5" />
                                            <Share2 className="h-3.5 w-3.5" />
                                        </span>
                                    </span>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="text-[13px] text-gray-700">
                            {ESTIMATES.map((estimate) => (
                                <tr
                                    key={estimate.id}
                                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70"
                                >
                                    <td className="px-3 py-3.5 align-top">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(estimate.id)}
                                            onChange={() => toggleRow(estimate.id)}
                                            aria-label={`Select estimate ${estimate.id}`}
                                            className="form-checkbox"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3.5 align-top">
                                        {estimate.date}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3.5 align-top">
                                        {estimate.id}
                                    </td>
                                    <td className="px-3 py-3.5 align-top font-medium text-gray-900">
                                        {estimate.customer}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3.5 align-top">
                                        {estimate.amount}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3.5 align-top">
                                        <span
                                            className={`flex items-center gap-1.5 ${estimate.status.tone === "overdue"
                                                    ? "text-brand-error"
                                                    : "text-gray-600"
                                                }`}
                                        >
                                            <Clock className="h-3.5 w-3.5 shrink-0" />
                                            {estimate.status.label}
                                        </span>
                                        {estimate.status.sub && (
                                            <span className="mt-0.5 block pl-5 text-[11px] text-gray-400">
                                                {estimate.status.sub}
                                            </span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3.5 align-top">
                                        <span
                                            className={`inline-flex min-w-[62px] justify-center rounded-full px-3 py-1 text-[11px] font-semibold ${SCORE_STYLES[estimate.score]
                                                }`}
                                        >
                                            {estimate.score}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3.5 align-top">
                                        <span className="flex items-center gap-1.5 text-[12px] text-brand-blue-mid">
                                            <button type="button" className="hover:underline">
                                                View/Edit
                                            </button>
                                            <span className="text-gray-300">|</span>
                                            <button type="button" className="hover:underline">
                                                Convert To Invoice
                                            </button>
                                            <button type="button" aria-label="More actions">
                                                <ChevronDown className="h-3.5 w-3.5" />
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap items-center justify-center gap-4 border-t border-gray-200 px-3 py-3 text-[11px] text-gray-400 sm:gap-8">
                    <button type="button" className="hover:text-gray-600">
                        Previous
                    </button>
                    <span className="text-gray-600">1-3 of 3</span>
                    <button type="button" className="hover:text-gray-600">
                        Next
                    </button>
                    <button type="button" className="hover:text-gray-600">
                        Last
                    </button>
                </div>
            </section>
        </div>
    );
};

/** Outlined button with an attached caret, used by the table toolbar. */
const SplitButton = ({ label, icon: Icon }) => (
    <div className="flex overflow-hidden rounded-md border border-gray-200">
        <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-brand-blue-mid transition-colors hover:bg-gray-50"
        >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {label}
        </button>
        <button
            type="button"
            aria-label={`${label} options`}
            className="flex items-center border-l border-gray-200 px-2 text-gray-500 transition-colors hover:bg-gray-50"
        >
            <ChevronDown className="h-3.5 w-3.5" />
        </button>
    </div>
);

export default Estimate;
