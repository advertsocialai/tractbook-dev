import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const YEARS = Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - i);
const LEGAL_STRUCTURES = [
    "Sole Proprietorship",
    "Partnership",
    "Corporation",
    "LLC",
    "Non-Profit",
];

const TractbookOnboarding = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("Mr.");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [yearStarted, setYearStarted] = useState("");
    const [legalStructure, setLegalStructure] = useState("");
    const [country, setCountry] = useState("US");

    const canSubmit =
        firstName.trim().length > 0 &&
        businessName.trim().length > 0 &&
        yearStarted !== "" &&
        legalStructure !== "";

    const handleNext = (e) => {
        e.preventDefault();
        if (!canSubmit) return;
        navigate("/tax-details", {
            state: { title, firstName, lastName, businessName, yearStarted, legalStructure, country },
        });
    };

    return (
        <div className="min-h-screen flex bg-white font-sans text-gray-900 overflow-hidden">

            {/* Left Column - Form */}
            <div className="w-full lg:w-1.3/2 flex flex-col p-8 md:p-12 lg:p-16 xl:px-24">
                <div className='max-w-xl'>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-green-400 rounded-full w-1/5"></div>
                    </div>

                    {/* Headings */}
                    <h2 className=" mb-2">Welcome to Tractbook!</h2>
                    <h5 className=" mb-8">Tell us about you and your business</h5>

                    {/* Form Container */}
                    <form onSubmit={handleNext} className="space-y-5 ">

                        {/* Name Field */}
                        <div>
                            <label className="form-label">
                                What's your name? <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-col lg:flex-row gap-3">
                                {/* Salutation / Title Dropdown */}
                                <select
                                    aria-label="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full lg:w-24 border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-8 text-sm bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_10px_center] bg-no-repeat"
                                >
                                    <option>Mr.</option>
                                    <option>Ms.</option>
                                    <option>Mrs.</option>
                                </select>

                                {/* First Name Input */}
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    aria-label="First Name"
                                    className="flex-1 form-input-sm"
                                />

                                {/* Last Name Input */}
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    aria-label="Last Name"
                                    className="flex-1 form-input-sm"
                                />
                            </div>
                        </div>

                        {/* Business Name Field */}
                        <div>
                            <label className="form-label">
                                What's your business name? <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Acme Consulting Inc."
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className="form-input-sm"
                            />
                        </div>

                        {/* Start Year Field */}
                        <div>
                            <label className="form-label">
                                What year did you start your business? <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={yearStarted}
                                onChange={(e) => setYearStarted(e.target.value)}
                                className={`form-select-sm ${yearStarted === "" ? "placeholder" : ""}`}
                            >
                                <option value="">Select a year...</option>

                                {YEARS.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Legal Structure Field */}
                        <div>
                            <label className="form-label">
                                What is the legal structure of your business? <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={legalStructure}
                                onChange={(e) => setLegalStructure(e.target.value)}
                                className={`form-select-sm ${legalStructure === "" ? "placeholder" : ""}`}>
                                <option value="">Select your business type</option>
                                {LEGAL_STRUCTURES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>

                        </div>

                        {/* Country Field (Note: Replicated exact text from image where Country/Currency labels appear swapped) */}
                        <div>
                            <label className="form-label">
                                Business country <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="form-select-sm">
                                <option value="US">USD ($) - U.S. dollar</option>
                                <option value="CA">CAD ($) - Canadian dollar</option>
                            </select>
                        </div>

                        {/* Currency Field */}
                        <div className="relative">
                            <label className="form-label">
                                Business currency
                            </label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="form-select-sm">
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                            </select>

                            {/* Simulated overlay avatar seen in the mockup */}

                        </div>

                        {/* Helper Text */}
                        <p className="text-[16px] text-gray-800 font-medium pt-2">
                            Looks like your business is in the {country === "CA" ? "Canada" : "United States"} and you do business in <span className="font-bold">{country === "CA" ? "Canadian" : "U.S."} dollars.</span>

                            <a href="#" className="text-blue-600 hover:underline font-normal">Change this.</a>
                        </p>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-10 py-2.5 bg-gray-300 text-white text-sm font-medium rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className="px-12 py-2.5 bg-[#124BD1] disabled:bg-blue-200 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                            >
                                Next
                            </button>
                        </div>

                    </form>
                </div>
            </div>


            {/* Right Column - Gray Placeholder Graphic Area */}
            <div className="hidden lg:block lg:w-1/2 bg-[#dcdcdc]">
                {/* The solid gray background representing the right side of the image */}
            </div>

        </div>
    );
};

export default TractbookOnboarding;
