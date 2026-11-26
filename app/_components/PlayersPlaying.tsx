"use client";

import { markParticipantPaid } from "@/app/actions/sessions";
import { Circle, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface PlayersPlayingProps {
  participantId: string;
  sessionId: string;
  initials: string;
  name: string;
  paid: boolean;
  money: string;
}

export default function PlayersPlaying({
  participantId,
  sessionId,
  initials,
  name,
  paid,
  money,
}: PlayersPlayingProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleMarkPaid = () => {
    setError(null);
    startTransition(async () => {
      const result = await markParticipantPaid(sessionId, participantId);
      if ("error" in result) {
        setError(result.error);
        return;
      }

      router.refresh();
    });
  };

  return (
    <>
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
            type="button"
            className="flex items-center bg-pale-dark rounded-2xl py-1 px-2 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            onClick={handleMarkPaid}
            disabled={paid || isPending}
          >
            {paid ? (
              <CircleCheck className="mr-1" size={20} />
            ) : (
              <Circle size={20} className="mr-1" />
            )}
            <span className="font-semibold text-sm">
              {paid ? "Paid" : isPending ? "Saving..." : "Mark Paid"}
            </span>
          </button>
        </div>
      </div>
      {error && (
        <p className="mb-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
