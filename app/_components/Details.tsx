import { Dot } from "lucide-react";

interface DetailsProps {
  courtNumber: string;
  venue: string;
  date: string;
  time: string;
  duration: string;
  courtPrice: string;
  shuttlePrice: string;
  totalPrice: string;
  individualPrice: string;
  playersPaid: string;
  totalPlayers: string;
  numberOfShuttles: string;
  typeOfShuttles: string;
}

export default function Details({
  courtNumber,
  venue,
  date,
  time,
  duration,
  courtPrice,
  shuttlePrice,
  totalPrice,
  individualPrice,
  playersPaid,
  totalPlayers,
  numberOfShuttles,
  typeOfShuttles,
}: DetailsProps) {
  return (
    <div className="shadow-md rounded-xl mb-6">
      <div className="bg-white p-4 pb-0 md:p-6 md:pb-0 rounded-t-xl">
        <div className="flex flex-col md:flex-row md:justify-between justify-normal border-b border-b-pale-dark pb-4">
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center mb-2 md:mb-1">
              <div className="flex items-center mb-2 md:mb-0">
                <span className="bg-pale-dark text-sm px-4 py-1 rounded-lg font-semibold mr-4">
                  Court {courtNumber}
                </span>
                <span className="font-bold text-lg mr-1">{venue}</span>
              </div>
              <div className="flex items-center">
                <Dot className="hidden md:inline-block" />
                <span className="flex items-center font-semibold">
                  {date} <Dot /> {time}
                </span>
                <Dot />
                <span className="font-semibold">{duration} hrs</span>
              </div>
            </div>

            <div className="flex items-center mb-2 md:mb-0">
              <span className="text-sm">
                <span className="font-semibold">{totalPlayers} players</span>
              </span>
              <Dot />
              <span className="font-semibold text-sm">
                {numberOfShuttles} Shuttles ({typeOfShuttles}){" "}
              </span>
            </div>
          </div>
          <div className="flex md:flex-col justify-between md:justify-normal items-end bg-pale rounded-xl py-2 px-2 md:px-4 md:py-2 font-semibold">
            <span className="text-zinc-600 text-xs md:text-sm">
              Court {courtPrice} + Shuttles {shuttlePrice}
            </span>
            <span className="text-xs md:text-sm">Total: {totalPrice}</span>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6 bg-white rounded-b-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex flex-col mr-2 md:mr-4">
              <span className="font-semibold text-xs">SHARE</span>
              <div>
                <span className="font-bold text-primary-dark text-base md:text-xl">
                  {individualPrice}
                </span>
                <span>/ ea</span>
              </div>
            </div>
            <div className="rounded-full py-1 px-2 bg-pale-light text-sm flex items-center">
              <span className="text-red-800 font-bold flex items-center">
                <Dot />
                {playersPaid}/{totalPlayers} Paid
              </span>
            </div>
          </div>
          <button className="bg-primary-dark text-xs md:text-base rounded-xl font-bold px-4 py-2 shadow cursor-pointer text-white hover:bg-primary">
            Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
