/**
 * Neutral shell used by the section pages that have not been designed yet.
 * Keeps padding, heading scale and spacing consistent with the Dashboard,
 * so replacing one with a real screen is a drop-in change.
 */
const PagePlaceholder = ({ title, description }) => {
    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <h1 className="text-2xl font-extrabold tracking-tight text-black sm:text-[28px]">
                {title}
            </h1>
            {description && (
                <p className="mt-2 max-w-2xl text-sm text-gray-500">{description}</p>
            )}

            <div className="mt-6 rounded-xl border border-dashed border-gray-300 px-6 py-16 text-center">
                <p className="text-sm text-gray-400">{title} content goes here.</p>
            </div>
        </div>
    );
};

export default PagePlaceholder;
