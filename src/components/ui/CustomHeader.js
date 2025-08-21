import { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";

export default function CustomHeader(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Call the search callback if provided
    if (props.onSearch) {
      props.onSearch(value);
    }
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    if (props.onSearch) {
      props.onSearch("");
    }
  };

  return (
    <div className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-white/10">
      <div className="-mt-2 -ml-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title and Search Bar */}
        <div className="mt-2 ml-4 flex-1">
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full rounded-md border-0 py-2 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Search products..."
            />
            {/* Clear button */}
            {searchTerm && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <svg
                  className="h-4 w-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Action Button */}
        <div className="mt-2 ml-4 shrink-0">
          {props.button?.isVisible && (
            <CustomButton
              onClick={props.button.onClick}
              label={props.button.label}
            />
          )}
        </div>
      </div>
    </div>
  );
}