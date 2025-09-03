import React from "react";
import { Link } from "react-router-dom";

export default function SignInButton() {
  return (
    <Link
      to="/auth"
      className="border rounded-2xl w-fit text-black px-4 p-2 bg-gray-200 cursor-pointer hover:opacity-90 duration-400"
    >
      Sign In
    </Link>
  );
}
