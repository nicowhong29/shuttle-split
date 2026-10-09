import { ChevronDown, CirclePlus, ListSortDescending } from "lucide-react";

export default function FilterSection() {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow">
      <div className="flex justify-between flex-col md:flex-row">
        <button className="bg-primary-dark flex flex-1 md:flex-none items-center px-6 py-3 cursor-pointer rounded-xl text-white hover:bg-primary transition mb-2 md:mb-0">
          <CirclePlus className="mr-2" size={20} />
          <span className="font-bold">Create New Session</span>
        </button>
        <div className="flex">
          <div className="relative inline-block mr-2">
            <select
              className="appearance-none rounded-xl bg-pale py-2 pl-4 pr-10 text-base cursor-pointer outline-none h-full font-semibold md:w-64"
              name="venues"
              id="venues"
            >
              <option value="default">All Venues (4)</option>
              <option value="1">option 1</option>
              <option value="2">option 2</option>
              <option value="3">option 3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center ">
              <ChevronDown size={20} />
            </div>
          </div>
          <div className="relative inline-block">
            <select
              className="appearance-none rounded-xl bg-pale py-2 pl-4 pr-10 text-base cursor-pointer outline-none h-full font-semibold md:w-44"
              name="venues"
              id="venues"
            >
              <option value="default">Recent first</option>
              <option value="1">option 1</option>
              <option value="2">option 2</option>
              <option value="3">option 3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center ">
              <ListSortDescending size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
