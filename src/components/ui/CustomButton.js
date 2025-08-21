export default function CustomButton({ type = "primary", label, onClick }) {
  const baseClasses =
    "relative inline-flex items-center justify-center text-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 dark:shadow-none";

  const typeClasses =
    type === "primary"
      ? "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:outline-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus-visible:outline-gray-500";

  return (
    <button
      type="button"
      className={`${baseClasses} ${typeClasses}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
