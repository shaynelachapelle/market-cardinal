import { useUser } from "../stores/UserContext";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";

export default function SignOutButton() {
  const { user, logout } = useUser();
  return (
    <button
      onClick={logout}
      className="flex flex-row items-center gap-2 w-fit text-left text-sm text-red-500 hover:text-red-600 cursor-pointer duration-200"
    >
      <span>Sign Out</span> <ArrowLeftStartOnRectangleIcon className="size-4" />
    </button>
  );
}
