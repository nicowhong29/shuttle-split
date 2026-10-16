import { Calculator } from "lucide-react";

export default function PriceSplit() {
  return (
    <>
      <div className="md:bg-white md:rounded-xl md:shadow md:p-6 relative">
        <div className="mb-4 hidden md:block">
          <h2 className="text-3xl font-bold text-gray-900">Split Breakdown</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Automatic equal allocation
          </p>
        </div>
        <div className="space-y-2 border-b border-gray-100 mb-6 pb-4 hidden md:block">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-gray-800 font-medium">
              Court Rental (2 hrs)
            </div>
            <span className="font-bold text-gray-900">$40.00</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-gray-800 font-medium">
              Shuttlecocks (3 × $2.50)
            </div>
            <span className="font-bold text-gray-900">$7.50</span>
          </div>
        </div>
        <div className="justify-between items-end mb-6 hidden md:flex">
          <span className="font-semibold">Session Total</span>
          <h3 className="font-bold text-primary-dark text-5xl">$47.50</h3>
        </div>
        <div className="bg-pale md:flex items-center p-4 rounded-xl mb-6 hidden">
          <div className="bg-white shadow-xl flex items-center justify-center w-15 h-15 rounded-lg mr-4">
            <Calculator className="text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] mb-1">$47.50 ÷ 4 PLAYERS</span>
            <div>
              <span className="font-bold text-2xl">$11.88</span>
              <span>/ person</span>
            </div>
          </div>
        </div>
        <div className="bg-pale p-4 rounded mb-20 md:hidden">
          <div className="grid grid-cols-2 text-xs mb-3 gap-1 [&>*:nth-child(even)]:text-right">
            <span className="text-[#3F4944] font-bold">SPLIT BREAKDOWN</span>
            <span className="font-bold text-[#006C4B]">EQUAL SPLIT</span>
            <span>Court Rental (2 hrs)</span>
            <span className="font-semibold">$40.00</span>
            <span>Shuttlecocks (3 × $2.50)</span>
            <span className="font-semibold">$7.50</span>
            <span className="text-sm font-bold">Session Total</span>
            <span className="text-sm font-bold">$47.50</span>
          </div>
          <div className="grid grid-cols-2 bg-pale-dark p-2.5 text-xs">
            <div className="flex items-center">
              <Calculator className="text-primary" />
              <span>$47.50 ÷ 4 players</span>
            </div>
            <span className="flex items-center justify-end text-primary-dark font-bold text-sm">
              $11.88 / person
            </span>
          </div>
        </div>
        <div className="fixed bottom-4 left-6 right-5 z-50 p-4 bg-purple-dark  shadow-lg md:static rounded-2xl md:border md:p-5">
          <div className="text-xs text-gray-400 font-semibold mb-1 md:mb-2">
            SPLIT PER PERSON
          </div>
          <div className="flex md:flex-col items-center md:items-baseline justify-between">
            <div className="text-2xl md:text-5xl font-bold text-[#68FCBF] md:mb-4">
              $11.88{" "}
              <span className="text-xs text-[#EEF0FF] font-normal">
                / person
              </span>
            </div>
            <button className="md:w-full md:justify-center bg-primary-light text-primary-dark cursor-pointer font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
              Split Now →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
