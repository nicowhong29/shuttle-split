import { Circle, CircleCheck } from "lucide-react";

interface PlayersPlayingProps {
  initials: string;
  name: string;
  paid: boolean;
  money: string;
  onClick?: () => void;
}

export default function PlayersPlaying({
  initials,
  name,
  paid,
  money,
  onClick,
}: PlayersPlayingProps) {
  return (
    <div className="bg-pale p-2 md:p-4 flex justify-between rounded-lg mb-2 last:mb-0">
      <div className="flex items-center">
        <span className="bg-primary text-white font-bold mr-3 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-xs md:text-base shrink-0">
          {initials}
        </span>
        <div className="flex flex-col">
          <span className="font-bold text-sm md:text-base">{name}</span>
          <span className="text-xs md:text-xl font-bold">RM {money}</span>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="flex items-center bg-pale-dark rounded-2xl py-1 px-2"
          onClick={onClick}
        >
          {paid === false ? (
            <>
              <Circle size={14} className="mr-1" />
            </>
          ) : (
            <>
              <CircleCheck className="mr-1" />
            </>
          )}
          <span className="font-semibold text-sm">Mark Paid</span>
        </button>
      </div>
    </div>
  );
}
