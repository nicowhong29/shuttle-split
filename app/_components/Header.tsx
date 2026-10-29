"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ShuttleIcon from "@/public/icons/surfing shuttle logo.svg";
import Image from "next/image";
import HeaderDropdown from "@/app/_components/HeaderDropdown";
import { useUser } from "@hexclave/next";
import { useEffect } from "react";
import {
  clearDisplayNameCookies,
  getDisplayNameCookies,
} from "../actions/auth";

export default function Header() {
  const pathname = usePathname();
  const user = useUser();
  const isHomePage = ["/", "/auth", "/add/session"].includes(pathname);

  useEffect(() => {
    async function getDisplayName() {
      if (user) {
        const name = await getDisplayNameCookies();
        if (name) {
          await user.setDisplayName(name);
          await clearDisplayNameCookies();
        }
      }
    }

    getDisplayName();
  }, [user]);

  const getInitials = () => {
    if (user?.displayName) {
      const parts = user.displayName.trim().split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }
  };

  const handleOnClick = () => {
    user?.signOut({ redirectUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="md:mx-auto flex h-16 max-w-4/5 items-center justify-between px-6 md:px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-slate-900 text-lg"
        >
          <span className="flex h-8 w-8 items-center justify-center text-white">
            <Image src={ShuttleIcon} alt="ShuttleIcon" />
          </span>
          <span className="text-2xl">
            Shuttle<span className="text-primary-dark">Split</span>
          </span>
        </Link>

        {!isHomePage && user !== null && (
          <div className="flex items-center">
            <Link
              href="/sessions/new"
              className="hidden md:flex items-center gap-1.5 rounded-lg bg-primary-dark px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary transition-all mr-4"
            >
              <Plus className="h-4 w-4" />
              <span>New Session</span>
            </Link>

            <Link
              href="/sessions/new"
              aria-label="Start New Session"
              className="md:hidden fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-900/30 active:scale-95 transition-all hover:bg-emerald-800"
            >
              <Plus className="h-7 w-7" />
            </Link>
            <div className="relative group">
              <div className="bg-primary text-white font-bold mr-3 w-10 h-10 flex items-center justify-center rounded-full text-xs">
                <div className="font-bold truncate">{getInitials()}</div>
              </div>
              <div className="absolute right-0 top-full pt-3 w-48 hidden group-hover:block z-50">
                <HeaderDropdown handleOnClick={handleOnClick} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
