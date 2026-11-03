"use client";

import AddGuest from "@/app/_components/AddGuest";
import BackButton from "@/app/_components/BackButton";
import InputType from "@/app/_components/InputType";
import Players from "@/app/_components/Players";
import PriceSplit from "@/app/_components/PriceSplit";
import {
  Calendar,
  MapPin,
  MapPinned,
  Minus,
  Plus,
  User,
  UserPlus,
  Whistle,
} from "lucide-react";
import { useState } from "react";

const players = [
  { id: 1, initials: "NW", name: "Nico Whong" },
  { id: 2, initials: "NW", name: "Nico Whong" },
  { id: 3, initials: "NW", name: "Nico Whong" },
];

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
    placeholder: "e.g. RM 40.00",
    allotment: " / shuttle",
    amount: "12",
  },
];

export default function AddSession() {
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [courtPrice, setCourtPrice] = useState("");
  const [tubeType, setTubeType] = useState("");
  const [tubePrice, setTubePrice] = useState("");
  const [shuttlesUsed, setShuttlesUsed] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleIncrement = () => {
    setShuttlesUsed((prev) => (prev += 1));
  };

  const handleDecrement = () => {
    setShuttlesUsed((prev) => (prev -= 1));
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
          <form className="md:col-span-2" action="">
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
              <div className="relative flex items-center">
                <span className="absolute left-3.5 h-5 w-5 text-xs text-gray-400 pointer-events-none">
                  RM
                </span>
                <input
                  className="py-2.5 pl-10 pr-3 bg-pale rounded w-full"
                  id="court"
                  type="number"
                  name="court"
                  step="0.01"
                  autoComplete="court"
                  min="0"
                  required
                  placeholder="Rental Fee"
                  value={courtPrice}
                  onChange={(e) => setCourtPrice(e.target.value)}
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
                      formInput.field === "tubeType" ? tubeType : tubePrice
                    }
                    onChange={(value) => {
                      if (formInput.field === "tubeType") {
                        setTubeType(value);
                      } else {
                        setTubePrice(value);
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
            <PriceSplit />
          </div>
        </div>
      </section>
      <AddGuest isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
