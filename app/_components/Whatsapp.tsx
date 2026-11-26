"use client";

import { Clipboard, SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DownloadReceiptButton,
  type ReceiptData,
} from "@/app/_components/DownloadReceiptButton";

export default function Whatsapp({
  sessionId,
  location,
  sessionDate,
  courtDuration,
  courtCost,
  shuttleType,
  shuttlesUsed,
  shuttleCost,
  totalPrice,
  perPersonPrice,
  players,
}: ReceiptData) {
  const templates =
    `${location} Match Summary\n` +
    `Total: RM ${totalPrice.toFixed(2)} • RM ${perPersonPrice.toFixed(2)} / person\n` +
    `Players: ${players.map((player) => player.name).join(", ")}\n`;

  const [text, setText] = useState(templates);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  useEffect(() => {
    if (copyStatus !== "copied") {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopyStatus("idle"), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [copyStatus]);

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <>
      <div className="flex items-center mb-1 md:mb-4">
        <SendHorizontal className="mr-1" />
        <span className="font-bold text-xs md:text-2xl">Outgoing Preview</span>
      </div>
      <div className="md:mb-2">
        <textarea
          rows={5}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setCopyStatus("idle");
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-lg font-semibold"
        />
      </div>
      <div className="flex items-center justify-end mt-3">
        <button
          type="button"
          onClick={handleCopySummary}
          className="hidden md:flex items-center bg-[#006C4B] py-3 justify-center text-white rounded-xl cursor-pointer px-6 mr-2"
        >
          <Clipboard className="mr-2" />
          <span className="font-semibold">
            {copyStatus === "copied"
              ? "Copied!"
              : copyStatus === "error"
                ? "Copy failed"
                : "Copy Summary"}
          </span>
        </button>
        <DownloadReceiptButton
          sessionId={sessionId}
          location={location}
          sessionDate={sessionDate}
          courtDuration={courtDuration}
          courtCost={courtCost}
          shuttleType={shuttleType}
          shuttlesUsed={shuttlesUsed}
          shuttleCost={shuttleCost}
          totalPrice={totalPrice}
          perPersonPrice={perPersonPrice}
          players={players}
        />
      </div>
      {copyStatus === "error" && (
        <p className="mt-2 text-right text-sm text-red-600" role="alert">
          Could not copy the summary. Select the text and copy it manually.
        </p>
      )}
    </>
  );
}
