"use client";

import AddGuest from "@/app/_components/AddGuest";
import BackButton from "@/app/_components/BackButton";
import InputType from "@/app/_components/InputType";
import Players from "@/app/_components/Players";
import PriceSplit from "@/app/_components/PriceSplit";
import {
  Calendar,
  Hourglass,
  MapPin,
  MapPinned,
  Minus,
  Plus,
  User,
  UserPlus,
  Whistle,
} from "lucide-react";
import { useUser } from "@hexclave/next";
import { useState } from "react";

const formInputs = [
  {
    field: "tubeType" as const,
    title: "TUBE GRADE",
    placeholder: "e.g. Yonex AS-30",
    allotment: "pcs / tube",
    amount: "12",
  },
  {
    field: "tubePrice" as const,
    title: "TUBE PRICE",
    placeholder: "e.g. 40.00",
    allotment: " / shuttle",
    amount: "12",
  },
];

export default function AddSession() {
  const user = useUser();
  const hostName = user?.displayName?.trim() || "Host";
  const hostNameParts = hostName.split(/\s+/);
  const hostInitials =
    hostNameParts.length > 1
      ? `${hostNameParts[0][0]}${hostNameParts[hostNameParts.length - 1][0]}`
      : hostName.slice(0, 2);
  const players = [
    {
      id: 1,
      initials: hostInitials.toUpperCase(),
      name: hostName,
      isHost: true,
    },
    { id: 2, initials: "P2", name: "Player 2", isHost: false },
    { id: 3, initials: "P3", name: "Player 3", isHost: false },
  ];

  const [venue, setVenue] = useState("");
  const [duration, setDuration] = useState("1");
  const courtDuration = duration === "" ? 0 : Number(duration);
  const [date, setDate] = useState("");
  const [courtPrice, setCourtPrice] = useState("0");
  const courtRentalFee = courtPrice === "" ? 0 : Number(courtPrice);
  const badmintonPlayers = players.length;
  const [tubeType, setTubeType] = useState("");
  const [tubePrice, setTubePrice] = useState<number>();
  const [tubePriceInput, setTubePriceInput] = useState("");
  const [shuttlesUsed, setShuttlesUsed] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shuttlePrice = tubePrice == null ? 0 : tubePrice / 12;

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleIncrement = () => {
    setShuttlesUsed((prev) => (prev += 1));
  };

  const handleDecrement = () => {
    setShuttlesUsed((prev) => (prev -= 1));
  };

  const handleSubmitForm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      venue,
      duration,
      date,
      courtPrice: courtRentalFee,
      tubeType,
      tubePrice,
      shuttlesUsed,
      shuttlePrice,
      players,
      numberOfPlayers: badmintonPlayers,
    };

    console.log("Submitted:", formData);
  };

  return (
    <>
      <section className="md:mx-auto flex-1 max-w-full md:max-w-4/5 mb-6">
        <BackButton title="Back to Dashboard" link="/dashboard" />

        <div className="flex flex-col mb-4">
          <h1 className="text-4xl font-bold">New Session Setup</h1>
          <p>Configure court hire, shuttlecock consumption, and attendance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <form
            id="badminton-form"
            className="md:col-span-2"
            onSubmit={handleSubmitForm}
          >
            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center mb-5">
                <div className="bg-primary-light w-10 h-10 flex items-center justify-center rounded-full mr-3">
                  <MapPinned size={20} className="text-primary-dark" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold">Court & Venue</h3>
                  <p className="text-sm">Booking slot and direct court hire</p>
                </div>
              </div>
              <label className="font-semibold text-xs mb-1" htmlFor="">
                VENUE
              </label>
              <div className="relative flex items-center mb-2">
                <MapPin
                  color="#6F7973"
                  className="absolute left-3.5 h-5 w-5 text-gray-400 pointer-events-none"
                />
                <input
                  className="py-2.5 pl-10 pr-3 bg-pale rounded w-full"
                  id="venue"
                  type="text"
                  name="venue"
                  autoComplete="venue"
                  required
                  placeholder="Venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>
              <label className="font-semibold text-xs mb-1" htmlFor="">
                TIME
              </label>
              <div className="relative flex items-center mb-4">
                <Calendar
                  color="#6F7973"
                  className="absolute left-3.5 h-5 w-5 text-gray-400 pointer-events-none"
                />
                <input
                  className="py-2.5 pl-10 pr-3 bg-pale rounded w-full"
                  id="email"
                  type="date"
                  name="date"
                  autoComplete="date"
                  required
                  placeholder="Schedule"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <label className="font-semibold text-xs mb-1" htmlFor="">
                COURT RENTAL FEE
              </label>
              <div className="relative flex items-center mb-4">
                <span className="absolute left-3.5 h-5 w-5 text-xs text-gray-400 pointer-events-none">
                  RM
                </span>
                <input
                  className="py-2.5 pl-10 pr-3 bg-pale rounded w-full"
                  id="court"
                  type="text"
                  inputMode="decimal"
                  name="court"
                  autoComplete="court"
                  pattern="[0-9]+([.][0-9]{1,2})?"
                  required
                  placeholder="Rental Fee"
                  value={courtPrice}
                  onChange={(e) => {
                    const sanitized = e.currentTarget.value.replace(
                      /[^0-9.]/g,
                      "",
                    );
                    if (sanitized === "") {
                      setCourtPrice("0");
                      return;
                    }

                    const [whole, ...decimalParts] = sanitized.split(".");
                    const normalizedWhole =
                      whole.replace(/^0+(?=\d)/, "") || "0";
                    setCourtPrice(
                      decimalParts.length > 0
                        ? `${normalizedWhole}.${decimalParts.join("").slice(0, 2)}`
                        : normalizedWhole,
                    );
                  }}
                />
              </div>
              <label className="font-semibold text-xs mb-1" htmlFor="">
                DURATION (hr)
              </label>
              <div className="relative flex items-center">
                <Hourglass
                  color="#6F7973"
                  className="absolute left-3.5 h-5 w-5 text-gray-400 pointer-events-none"
                />
                <input
                  className="py-2.5 pl-10 pr-3 bg-pale rounded w-full"
                  id="duration"
                  type="number"
                  name="duration"
                  autoComplete="duration"
                  min="1"
                  required
                  placeholder="1"
                  value={duration}
                  onChange={(e) => setDuration(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center mb-5">
                <div className="bg-primary-light w-10 h-10 flex items-center justify-center rounded-full mr-3">
                  <Whistle size={20} className="text-primary-dark" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold">Shuttlecock Usage</h3>
                  <p className="text-sm">Feather rate & consumption tracker</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {formInputs.map((formInput) => (
                  <InputType
                    key={formInput.field}
                    {...formInput}
                    value={
                      formInput.field === "tubeType" ? tubeType : tubePriceInput
                    }
                    onChange={(value) => {
                      if (formInput.field === "tubeType") {
                        setTubeType(value);
                      } else {
                        setTubePriceInput(value);
                        const numericPrice = Number(value);
                        setTubePrice(
                          value.trim() !== "" && Number.isFinite(numericPrice)
                            ? numericPrice
                            : undefined,
                        );
                      }
                    }}
                  />
                ))}
              </div>
              <div className="bg-pale rounded p-4 flex items-center justify-between relative select-none">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={shuttlesUsed <= 0}
                  aria-label="Decrease shuttles count"
                  className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer
              `}
                >
                  <Minus className="w-4 h-4 text-[#121927] stroke-3" />
                </button>
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={shuttlesUsed}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        const numericValue =
                          onlyDigits === "" ? 0 : Number(onlyDigits);
                        setShuttlesUsed(numericValue);
                      }}
                      style={{
                        width: `${Math.max(1, shuttlesUsed) * 0.75 + 0.5}em`,
                      }}
                      className="w-12 max-w-full text-5xl font-extrabold text-[#121927] bg-transparent text-center px-1 py-0.5 transition-all duration-150"
                    />
                  </div>

                  <span className="text-sm font-bold text-[#054A36] tracking-tight">
                    shuttles opened
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleIncrement}
                  aria-label="Increase shuttles count"
                  className="w-10 h-10 rounded-full bg-[#054A36] hover:bg-[#033B2B] active:bg-[#022D21] shadow-md flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-white stroke-3" />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center mb-5">
                <div className="bg-primary-light w-10 h-10 flex items-center justify-center rounded-full mr-3">
                  <User size={20} className="text-primary-dark" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold">Players</h3>
                  <p className="text-sm">
                    Tap courtside to toggle player share
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {players.map((player) => (
                  <Players key={player.id} {...player} />
                ))}
              </div>
              <button
                className="flex items-center justify-center bg-pale text-primary-dark w-full h-11 rounded"
                onClick={handleOpenModal}
              >
                <UserPlus className="mr-2" />
                <span className="font-bold">Add Guest Player</span>
              </button>
            </div>
          </form>
          <div className="md:col-span-1">
            <PriceSplit
              courtDuration={courtDuration}
              courtRentalFee={courtRentalFee}
              shuttles={shuttlesUsed}
              eachShuttlePrice={shuttlePrice}
              numberOfPlayers={badmintonPlayers}
            />
          </div>
        </div>
      </section>
      <AddGuest isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
