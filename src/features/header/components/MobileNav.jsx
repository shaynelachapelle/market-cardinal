import { XMarkIcon } from "@heroicons/react/24/solid";
import ThemeToggle from "../../../components/ThemeToggle";
import SearchInput from "../../../components/SearchInput";
import SignInButton from "../../../components/SignInButton";
import SignOutButton from "../../../components/SignOutButton";
import NavLinks from "./NavLinks";
import { useUser } from "../../../stores/UserContext";

export default function MobileNav({ isOpen, onClose }) {
  const { user } = useUser();

  return (
    <div
      className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute top-0 right-0 w-64 h-full bg-bg shadow-lg p-6 flex flex-col gap-4 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="self-end text-text">
          <XMarkIcon className="size-8" />
        </button>
        <nav className="flex flex-col gap-4 text-text mt-2">
          <SearchInput />
          <hr className="py-1" />
          <NavLinks onClick={onClose} />
          <ThemeToggle />
          <hr className="py-1" />
          {user ? <SignOutButton /> : <SignInButton />}
        </nav>
      </div>
    </div>
  );
}
