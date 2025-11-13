import { Link } from "react-router-dom";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";

export default function SignInButton() {
  return (
    <Link
      to="/auth"
      className="flex flex-row items-center justify-between gap-2 border border-primary rounded-lg md:rounded-xl w-full text-text text-sm font-semibold md:text-base px-2 md:px-3 py-1 bg-bg-light cursor-pointer hover:opacity-90 duration-400"
    >
      <span>Sign In</span>
      <ArrowLeftEndOnRectangleIcon className="md:hidden size-4" />
    </Link>
  );
}
