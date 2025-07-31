import React from "react";

function Header() {
  return (
    <div className="flex flex-row items-center justify-between bg-black min-w-screen h-20 px-6">
      <a href="#">
        <h1 className="font-heading text-white text-3xl font-bold">
          Market Cardinal
        </h1>
      </a>

      <div className="flex flex-row items-center justify-center gap-10 text-white ">
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
          Watchlist
        </a>
        <div className="relative flex flex-row">
          <input
            className="border rounded-2xl bg-gray-200 p-1 px-2 text-black focus:outline-none focus:ring-0"
            type="text"
            placeholder="Search"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gray-400"
            className="absolute right-2 top-2 size-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <a
          href="#"
          className="border rounded-2xl text-black px-4 p-2 bg-gray-200 hover:opacity-90 duration-400"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}

export default Header;
