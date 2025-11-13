import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { useUser } from "../../../stores/UserContext";

export default function EmailLabel() {
  const { user } = useUser();

  return (
    <div className="flex flex-row border border-border p-1 rounded-lg items-center gap-2 text-text text-sm">
      <EnvelopeIcon className="size-5" />
      <span className="truncate">{user.email}</span>
    </div>
  );
}
