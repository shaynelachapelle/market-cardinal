import React from "react";

function Header() {
  return (
    <div className="flex flex-row items-center justify-between bg-black min-w-screen h-20 px-6">
      <h1 className="font-heading text-white text-3xl font-bold">
        Financial Dashboard
      </h1>
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
        <input
          className="border rounded-2xl bg-gray-200 p-1 px-2 text-black focus:outline-none focus:ring-0"
          type="text"
          placeholder="Search"
        ></input>
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
