import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function PlusButton() {
  return (
    <div className="flex flex-row items-center gap-4">
      <PlusIcon
        className={`bg-bg-light rounded-xl border border-border-muted hover:border-border text-text size-6 cursor-pointer duration-200 `}
      />
    </div>
  );
}
