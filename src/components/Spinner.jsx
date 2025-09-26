import React from "react";

export default function Spinner() {
  return (
    <div>
      <svg
        className="animate-spin text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="4"
        />
        <circle
          className="opacity-75"
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="80"
          strokeDashoffset="60"
        />
      </svg>
    </div>
  );
}
