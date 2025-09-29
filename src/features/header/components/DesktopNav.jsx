// components/Header/DesktopNav.jsx
import ThemeToggle from "../../../components/ThemeToggle";
import SearchInput from "../../../components/SearchInput";
import SignInButton from "../../../components/SignInButton";
import NavLinks from "./NavLinks";
import { useUser } from "../../../stores/UserContext";
import ProfileMenu from "./ProfileMenu";

export default function DesktopNav() {
  const { user } = useUser();

  return (
    <div className="hidden md:flex flex-row items-center justify-center gap-10 text-text">
      <ThemeToggle />
      <NavLinks />
      <SearchInput />
      {user ? <ProfileMenu /> : <SignInButton />}
    </div>
  );
}
