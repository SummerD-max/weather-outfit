import { useState, type FormEvent } from "react";
import { HiOutlineXCircle, HiSearch } from "react-icons/hi";

function Search() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");

  function handleFocus() {
    setShowDropdown(true);
  }

  function handleBlur() {
    setShowDropdown(false);
  }

  function handleChange(e: FormEvent<HTMLInputElement>) {
    setQuery(e.currentTarget.value);
  }

  return (
    <div className="relative w-64">
      <form
        className="relative w-full"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          setShowDropdown(false);
        }}
      >
        <input
          className={`w-full rounded-xl ${showDropdown && "rounded-b-none"} px-2 py-1 ring-1 ring-blue-500 transition-all duration-300 focus:bg-sky-100/40 focus:ring-1 focus:ring-blue-700 focus:outline-none`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={query}
          onChange={handleChange}
        />

        {query && (
          <HiOutlineXCircle
            className="absolute top-2 right-6 cursor-pointer"
            onClick={() => setQuery("")}
          />
        )}
        <HiSearch className="pointer-events-none absolute top-2 right-2 text-gray-400" />
      </form>

      <div
        className={`absolute top-full mt-2 w-full rounded-b-lg bg-sky-50 p-4 shadow-lg ${showDropdown ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-0.5 opacity-0"} transition-all duration-300`}
      >
        <div className="cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-200">
          <span className="mr-2">1</span>
          <span className="">IG 3:1 战胜 T1</span>
        </div>
        <div className="mt-2 cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-200">
          <span className="mr-2">2</span>
          <span className="">RNG 3:2 战胜 EDG</span>
        </div>
        <div className="mt-2 cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-200">
          <span className="mr-2">3</span>
          <span className="">FPX 3:0 战胜 TES</span>
        </div>
        <div className="mt-2 cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-200">
          <span className="mr-2">4</span>
          <span className="">JDG 3:1 战胜 WE</span>
        </div>
        <div className="mt-2 cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-200">
          <span className="mr-2">5</span>
          <span className="">SN 3:2 战胜 BLG</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
