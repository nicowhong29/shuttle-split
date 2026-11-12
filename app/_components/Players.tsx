import { X } from "lucide-react";

interface PlayersProps {
  initials: string;
  name: string;
  isHost?: boolean;
  onRemove: () => void;
}

export default function Players({
  initials,
  name,
  isHost = false,
  onRemove,
}: PlayersProps) {
  return (
    <div className="relative">
      <div className="flex items-center rounded bg-pale p-2.5">
        <span className="bg-primary text-white font-bold mr-3 w-10 h-10 flex items-center justify-center rounded-full text-xs shrink-0">
          {initials}
        </span>
        <div className="min-w-0">
          <div className="font-bold truncate">{name}</div>
          {isHost && (
            <div className="text-[10px] font-bold uppercase tracking-wider text-primary-dark">
              Host
            </div>
          )}
        </div>
      </div>
      {!isHost && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="flex items-center justify-center absolute right-0 top-0 transform translate-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-black cursor-pointer"
        >
          <X className="text-white" size={18} />
        </button>
      )}
    </div>
  );
}
