import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-10 text-text">
      <h1 className="text-4xl">Page Not Found</h1>
      <Link
        to="/"
        className="rounded-xl shadow border border-border bg-bg hover:bg-bg-light p-2 duration-200"
      >
        Return Home
      </Link>
    </div>
  );
}
