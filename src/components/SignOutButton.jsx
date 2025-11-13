import { useUser } from "../stores/UserContext";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";

export default function SignOutButton() {
  const { user, logout } = useUser();
  return (
    <button
      onClick={logout}
      className="flex flex-row items-center justify-between rounded-lg border border-red-500/80 gap-2 w-full px-2 py-1 text-left font-semibold text-sm text-red-500 hover:text-red-600 cursor-pointer bg-red-500/20 duration-200"
    >
      <span>Sign Out</span> <ArrowLeftStartOnRectangleIcon className="size-4" />
    </button>
  );
}
