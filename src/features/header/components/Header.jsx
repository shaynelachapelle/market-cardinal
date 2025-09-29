import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Logo from "../../../components/Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-20 flex flex-row border-b border-border shadow items-center justify-between bg-bg min-w-screen h-20 px-3 md:px-6">
      <Logo />
      <DesktopNav />
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-text focus:outline-none"
      >
        <Bars3Icon className="size-8" />
      </button>
      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
