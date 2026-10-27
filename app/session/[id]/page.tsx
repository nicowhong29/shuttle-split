import BackButton from "@/app/_components/BackButton";
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
  ReceiptText,
  UserRoundGroup,
} from "lucide-react";

const players = [
  { id: 1, initials: "NW", name: "Nico Whong", paid: false, money: "12.00" },
  { id: 2, initials: "NW", name: "Nico Whong", paid: false, money: "12.00" },
  { id: 3, initials: "NW", name: "Nico Whong", paid: false, money: "12.00" },
];

export default function Page() {
  return (
    <section className="md:mx-auto flex-1 max-w-full md:max-w-4/5 mb-6">
      <BackButton title="Back to Dashboard" link="/dashboard" />
      <div className="flex items-center justify-center md:justify-between mb-2">
        <div className="flex flex-col mb-2 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-1">
            Receipt & Split
          </h1>
          <p className="text-center text-sm md:text-base">
            Yonex Arena • Oct 24 • Match #14
          </p>
        </div>
        <button className="hidden md:flex shrink-0 items-center bg-primary text-white py-2 px-4 rounded-lg">
          <ReceiptText className="mr-2" />
          <span className="font-bold">Print Receipt</span>
        </button>
      </div>
      <div className="grid grid-cols-12 gap-6 last:gap-3">
        <div className="rounded-xl shadow py-6 px-4 col-span-12 md:col-span-5 bg-white">
          <div className="flex justify-between mb-3">
            <span className="font-bold">Yonex Arena</span>
            <span className="flex items-center text-xs bg-gray-100 rounded-xl px-2">
              Oct 24, 2024
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <div className="flex items-center">
              <ClockFading size={16} className="mr-1" />
              <span className="text-sm">Court booking fee (2h)</span>
            </div>
            <span className="font-bold text-sm">$40.00</span>
          </div>
          <div className="flex justify-between mb-3">
            <div className="flex items-center">
              <CirclePile size={16} className="mr-1" />
              <span className="text-sm">Shuttlecocks (3x AS-30)</span>
            </div>
            <span className="font-bold text-sm">$40.00</span>
          </div>
          <div className="border border-dotted mt-3"></div>
          <div className="flex justify-between items-center mt-3">
            <span className="font-semibold text-xs self-end">Grand Total</span>
            <span className="font-bold text-2xl md:text-4xl self-end">
              $47.50
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
                <span className="text-sm">Split equally (4 players)</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-primary-dark text-2xl md:text-4xl font-bold">
                $11.88
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
            <PlayersPlaying key={player.id} {...player} />
          ))}
        </div>
        <div className="col-span-12 md:col-start-6 md:col-span-7 bg-white shadow rounded-xl p-4 mb-7">
          <Whatsapp />
        </div>
        <button className="flex md:hidden items-center bg-[#006C4B] col-span-12 md:col-start-6 md:col-span-7 py-4 justify-center text-white rounded-xl">
          <FontAwesomeIcon className="mr-2 w-6 h-6" icon={faWhatsapp} />
          <span className="font-semibold">Send Summary via WhatsApp</span>
        </button>
        <button className="flex md:hidden items-center bg-[#E2E7FF] col-span-12 md:col-start-6 md:col-span-7 py-4 justify-center rounded-xl">
          <Link className="mr-2" />
          <span className="font-semibold">Copy Receipt</span>
        </button>
      </div>
    </section>
  );
}
