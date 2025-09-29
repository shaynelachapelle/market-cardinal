import React from "react";
import { Link } from "react-router-dom";
import { useMarketStatus } from "../stores/MarketStatusContext";

function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  const { isMarketOpen } = useMarketStatus();

  return (
    <div className="flex flex-col justify-between border-t border-border bg-bg px-6 py-4 pb-6 gap-6 cursor-default">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="font-heading text-text text-2xl font-bold">
            Market Cardinal
          </h2>
          <h3 className="text-text">{formatDate(new Date())}</h3>
        </div>
        <div className="group flex items-center space-x-2 text-text-muted bg-bg-light border border-border-muted rounded-lg py-1 px-2">
          <span className="relative flex h-3 w-3">
            <span
              className={`group-hover:animate-ping absolute inline-flex h-full w-full rounded-full ${
                isMarketOpen ? "bg-green-500" : "bg-red-500"
              } opacity-50`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                isMarketOpen ? "bg-green-500" : "bg-red-500"
              } opacity-65`}
            />
          </span>
          <span className="text-sm font-mono">
            {isMarketOpen ? "Market Open" : "Market Closed"}
          </span>
        </div>
      </div>
      <hr className="w-full text-text-muted" />
      <div className="flex flex-row justify-between text-text-muted text-xs">
        <a href="https://logo.dev" className="hover:opacity-80 duration-200">
          Logos provided by Logo.dev
        </a>
        <p>©{year} Market Cardinal, Copyright All Rights Reserved.</p>
        <div className="flex flex-row gap-4">
          <Link to="/privacy" className="hover:opacity-80 duration-200">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:opacity-80 duration-200">
            Terms of Service
          </Link>
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

export default Footer;
