import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import SignInButton from "./SignInButton";
import SearchInput from "./SearchInput";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-100 flex flex-row items-center justify-between bg-black min-w-screen h-20 px-3 md:px-6">
      <a href="#" className="">
        <h1 className="font-heading text-white text-3xl font-bold leading-none">
          Market Cardinal
        </h1>
      </a>

      {/*<h2 className="text-white font-semibold">{formatDate(new Date())}</h2>*/}

      <div className="hidden md:flex flex-row items-center justify-center gap-10 text-white ">
        <ThemeToggle />
        <a
          href="#"
          className="border-b border-transparent hover:border-white duration-200"
        >
          Overview
        </a>
        <a
          href="#"
          className="border-b border-transparent hover:border-white duration-200"
        >
          News
        </a>
        <a
          href="#"
          className="border-b border-transparent hover:border-white duration-200"
        >
          Watchlists
        </a>
        <SearchInput />
        <SignInButton />
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-white focus:outline-none"
      >
        <Bars3Icon className="size-8" />
      </button>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-64 h-full bg-bg shadow-lg p-6 flex flex-col gap-4 z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="self-end text-text"
          >
            <XMarkIcon className="size-8" />
          </button>
          <nav className="flex flex-col gap-4 text-text mt-2">
            <SearchInput />
            <hr className="py-1" />
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="border-b border-transparent hover:border-white duration-200"
            >
              Overview
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="border-b border-transparent hover:border-white duration-200"
            >
              News
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="border-b border-transparent hover:border-white duration-200"
            >
              Watchlists
            </a>
            <ThemeToggle />
            <hr className="py-1" />
            <SignInButton />
          </nav>
        </div>
      </div>
    </div>
  );
}

function formatDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Get ordinal suffix for the day
  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th"; // 11th - 20th
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${dayName} ${monthName} ${day}${getOrdinal(day)}, ${year}`;
}

export default Header;
