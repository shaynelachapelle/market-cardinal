import React from "react";
import { useUser } from "../stores/UserContext";

export default function SignOutButton() {
  const { user, logout } = useUser();
  return (
    <button
      onClick={logout}
      className="w-fit text-left text-sm text-red-500 hover:text-red-600 cursor-pointer duration-200"
    >
      Sign Out
    </button>
  );
}
