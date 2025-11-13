import { XMarkIcon } from "@heroicons/react/24/solid";
import ThemeToggle from "../../../components/ThemeToggle";
import SearchInput from "../../../components/SearchInput";
import SignInButton from "../../../components/SignInButton";
import SignOutButton from "../../../components/SignOutButton";
import NavLinks from "./NavLinks";
import { useUser } from "../../../stores/UserContext";
import EmailLabel from "./EmailLabel";

export default function MobileNav({ isOpen, onClose }) {
  const { user } = useUser();

  return (
    <div
      className={`fixed inset-0 bg-black/40 w-screen min-h-screen z-40 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute top-0 right-0 w-64 h-full bg-bg shadow-lg px-4 py-6 flex flex-col gap-4 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="self-end text-text">
          <XMarkIcon className="size-8" />
        </button>
        <nav className="flex flex-col h-full justify-between text-text mt-2">
          <div className="flex flex-col gap-4">
            <SearchInput />
            <hr className="py-0" />
            <NavLinks onClick={onClose} />
            <hr className="py-1" />
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-3">
            {user && <EmailLabel />}
            {user ? <SignOutButton /> : <SignInButton />}
          </div>
        </nav>
      </div>
    </div>
  );
}
