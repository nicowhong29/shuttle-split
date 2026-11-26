import BackButton from "@/app/_components/BackButton";
import { DownloadReceiptButton } from "@/app/_components/DownloadReceiptButton";
import PlayersPlaying from "@/app/_components/PlayersPlaying";
import Whatsapp from "@/app/_components/Whatsapp";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Banknote,
  CirclePile,
  ClockFading,
  Dot,
  Link,
  UserRoundGroup,
} from "lucide-react";
import { hexclaveServerApp } from "@/app/hexclave/server";
import { sql } from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await hexclaveServerApp.getUser();

  if (!user) {
    redirect("/");
  }

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  ) {
    notFound();
  }

  const sessions = await sql`
    SELECT
      id,
      venue_name,
      TO_CHAR(session_date, 'Mon DD, YYYY') AS session_date,
      court_duration,
      court_cost,
      shuttle_type,
      shuttles_used,
      shuttle_cost,
      total_cost,
      (
        SELECT COUNT(*)::integer
        FROM session_participants
        WHERE session_participants.session_id = sessions.id
      ) AS total_players
    FROM sessions
    WHERE id = ${id}
      AND organizer_id = ${user.id}
    LIMIT 1
  `;
  const session = sessions[0];

  if (!session) {
    notFound();
  }

  const participants = await sql`
    SELECT id, name, amount_owed, has_paid
    FROM session_participants
    WHERE session_id = ${id}
    ORDER BY name
  `;
  const players = participants.map((participant) => {
    const nameParts = participant.name.trim().split(/\s+/);
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
        : participant.name.trim().slice(0, 2);

    return {
      id: participant.id,
      initials: initials.toUpperCase(),
      name: participant.name,
      paid: participant.has_paid === true,
      money: Number(participant.amount_owed).toFixed(2),
    };
  });

  const totalPlayers = Number(session.total_players);
  const totalCost = Number(session.total_cost);
  const splitCharge =
    totalPlayers > 0 ? (totalCost / totalPlayers).toFixed(2) : "0.00";
  const receiptData = {
    sessionId: session.id,
    location: session.venue_name,
    sessionDate: session.session_date,
    courtDuration: Number(session.court_duration),
    courtCost: Number(session.court_cost),
    shuttleType: session.shuttle_type,
    shuttlesUsed: Number(session.shuttles_used),
    shuttleCost: Number(session.shuttle_cost),
    totalPrice: totalCost,
    perPersonPrice: Number(splitCharge),
    players: players.map((player) => ({
      name: player.name,
      amountOwed: player.money,
      paid: player.paid,
    })),
  };

  return (
    <section className="md:mx-auto flex-1 max-w-full md:max-w-4/5 mb-6">
      <BackButton title="Back to Dashboard" link="/dashboard" />
      <div className="flex items-center justify-center md:justify-between mb-2">
        <div className="flex flex-col mb-2 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-1 text-left">
            Receipt
          </h1>
          <p className="text-center text-sm md:text-base">
            Match #{session.id.slice(0, 8).toUpperCase()}
          </p>
        </div>
        <DownloadReceiptButton mode="print" {...receiptData} />
      </div>
      <div className="grid grid-cols-12 gap-6 last:gap-3">
        <div className="rounded-xl shadow py-6 px-4 col-span-12 md:col-span-5 bg-white">
          <div className="flex justify-between mb-3">
            <span className="font-bold">{session.venue_name}</span>
            <span className="flex items-center text-xs bg-gray-100 rounded-xl px-2">
              {session.session_date}
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <div className="flex items-center">
              <ClockFading size={16} className="mr-1" />
              <span className="text-sm">
                Court booking fee ({Number(session.court_duration)}h)
              </span>
            </div>
            <span className="font-bold text-sm">RM {session.court_cost}</span>
          </div>
          <div className="flex justify-between mb-3">
            <div className="flex items-center">
              <CirclePile size={16} className="mr-1" />
              <span className="text-sm">
                Shuttlecocks ({session.shuttles_used}x {session.shuttle_type})
              </span>
            </div>
            <span className="font-bold text-sm">RM {session.shuttle_cost}</span>
          </div>
          <div className="border border-dotted mt-3"></div>
          <div className="flex justify-between items-center mt-3">
            <span className="font-semibold text-xs self-end">Grand Total</span>
            <span className="font-bold text-2xl md:text-4xl self-end">
              RM {session.total_cost}
            </span>
          </div>
          <div className="flex justify-between p-2 md:p-4 bg-primary-light/25 rounded-xl mt-3">
            <div className="flex items-center">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mr-2">
                <UserRoundGroup size={24} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-primary-dark text-xs">
                  Per Player Share
                </span>
                <span className="text-sm">({totalPlayers} players)</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-primary-dark text-2xl md:text-3xl font-bold">
                RM {splitCharge}
              </span>
              <span className="text-primary-dark text-xs font-bold">each</span>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 bg-white shadow rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <Banknote className="mr-1 md:hidden" />
              <span className="font-bold text-base: md:text-2xl">
                Payment Status
              </span>
            </div>
            <div className="flex items-center bg-amber-200 rounded-2xl text-sm pr-2">
              <Dot className="mr-1" />
              <span className="font-bold">2 of 4 Paid</span>
            </div>
          </div>
          {players.map((player) => (
            <PlayersPlaying
              key={player.id}
              {...player}
              participantId={player.id}
              sessionId={session.id}
            />
          ))}
        </div>
        <div className="col-span-12 md:col-start-6 md:col-span-7 bg-white shadow rounded-xl p-4 mb-7">
          <Whatsapp {...receiptData} />
        </div>
        <button className="flex md:hidden items-center bg-[#006C4B] col-span-12 md:col-start-6 md:col-span-7 py-4 justify-center text-white rounded-xl cursor-pointer">
          <FontAwesomeIcon className="mr-2 w-6 h-6" icon={faWhatsapp} />
          <span className="font-semibold">Send Summary via WhatsApp</span>
        </button>
        <button className="flex md:hidden items-center bg-[#E2E7FF] col-span-12 md:col-start-6 md:col-span-7 py-4 justify-center rounded-xl cursor-pointer">
          <Link className="mr-2" />
          <span className="font-semibold">Copy Receipt</span>
        </button>
      </div>
    </section>
  );
}
