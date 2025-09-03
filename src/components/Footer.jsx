import React from "react";

function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className="flex flex-col justify-between bg-black h-80 px-6 py-4 pb-12 gap-6 cursor-default">
      <div>
        <h2 className="font-heading text-white text-2xl font-bold">
          Market Cardinal
        </h2>
        <h3 className="text-white">{formatDate(new Date())}</h3>
      </div>
      <div className="flex flex-row items-center text-text gap-20">
        <div className="flex flex-col text-sm gap-2 ">
          <h3 className="text-base pb-1 text-zinc-500">Data Sources</h3>
          <a
            className="w-fit border-b text-zinc-400 border-transparent hover:border-border duration-200"
            href="#"
          >
            Market Data
          </a>
          <a
            className="w-fit border-b text-zinc-400 border-transparent hover:border-border duration-200"
            href="#"
          >
            Company Info
          </a>
          <a
            className="w-fit border-b text-zinc-400 border-transparent hover:border-border duration-200"
            href="#"
          >
            News Articles
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-zinc-500 text-xs">
        <a href="https://logo.dev">Logos provided by Logo.dev</a>
        <p>©{year} Market Cardinal, Copyright All Rights Reserved.</p>
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

export default Footer;
