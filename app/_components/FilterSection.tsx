"use client";

import { ChevronDown, CirclePlus, ListSortDescending } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FilterSectionProps {
  sessionCount: number;
  venues: string[];
  sort: string;
}

export default function FilterSection({
  sessionCount,
  venues,
  sort,
}: FilterSectionProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow">
      <div className="flex justify-between flex-col md:flex-row">
        <Link
          className="bg-primary-dark flex flex-1 md:flex-none items-center px-6 py-3 cursor-pointer rounded-xl text-white hover:bg-primary transition mb-2 md:mb-0"
          href="/session/new"
        >
          <CirclePlus className="mr-2" size={20} />
          <span className="font-bold">Create New Session</span>
        </Link>
        <div className="flex">
          <div className="relative inline-block mr-2">
            <select
              className="appearance-none rounded-xl bg-pale py-2 pl-4 pr-10 text-base cursor-pointer outline-none h-full font-semibold md:w-64"
              name="venues"
              id="venues"
            >
              <option value="default">All Venues ({sessionCount})</option>
              {venues.map((venue) => (
                <option key={venue} value={venue}>
                  {venue}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center ">
              <ChevronDown size={20} />
            </div>
          </div>
          <div className="relative inline-block">
            <select
              className="appearance-none rounded-xl bg-pale py-2 pl-4 pr-10 text-base cursor-pointer outline-none h-full font-semibold md:w-44"
              name="sort"
              id="sort"
              value={sort}
              onChange={(event) => {
                const nextSort = event.currentTarget.value;
                router.replace(
                  nextSort === "recent"
                    ? "/dashboard"
                    : `/dashboard?sort=${nextSort}`,
                );
              }}
            >
              <option value="recent">Recent first</option>
              <option value="unpaid">Unpaid first</option>
              <option value="paid">Paid first</option>
              <option value="price-asc">Total price: low to high</option>
              <option value="price-desc">Total price: high to low</option>
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
