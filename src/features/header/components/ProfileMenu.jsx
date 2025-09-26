import React, { useState, useRef, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import SignOutButton from "../../../components/SignOutButton";
import { useUser } from "../../../stores/UserContext";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { user } = useUser();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <UserCircleIcon
        onClick={() => setIsOpen((prev) => !prev)}
        className="size-9 text-white cursor-pointer hover:opacity-90 duration-300"
      />

      <div
        className={`absolute flex flex-col gap-3 right-0 mt-2 min-w-fit bg-bg border border-border rounded-lg shadow-lg z-10 p-3 transform transition-all duration-200 origin-top ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <span className="text-text cursor-default">{user.email}</span>
        <hr className="text-text-muted" />
        <SignOutButton />
      </div>
    </div>
  );
}
