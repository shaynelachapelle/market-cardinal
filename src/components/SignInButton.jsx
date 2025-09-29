import React from "react";
import { Link } from "react-router-dom";

export default function SignInButton() {
  return (
    <Link
      to="/auth"
      className="border border-primary rounded-2xl w-fit text-text px-4 p-2 bg-bg-light cursor-pointer hover:opacity-90 duration-400"
    >
      Sign In
    </Link>
  );
}
