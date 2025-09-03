import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function AuthError({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-3 w-full p-3 mb-4 text-sm text-white bg-red-600/70 border border-red-800/60 rounded-lg shadow-md backdrop-blur-sm">
      <ExclamationCircleIcon className="text-white size-6 flex-shrink-0" />
      <span className="flex-1">{message}</span>
    </div>
  );
}
