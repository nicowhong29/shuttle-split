"use client";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  showPassword: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setRememberMe: Dispatch<SetStateAction<boolean>>;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function LoginForm({
  email,
  password,
  rememberMe,
  showPassword,
  setEmail,
  setPassword,
  setRememberMe,
  setShowPassword,
  handleSubmit,
}: LoginFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm md:max-w-full"
    >
      <div className="flex flex-col mb-">
        <label className="font-semibold text-xs mb-1" htmlFor="username">
          Username
        </label>
        <div className="relative flex items-center">
          <UserRound
            color="#6F7973"
            className="absolute left-3.5 h-5 w-5 text-gray-400 pointer-events-none"
          />
          <input
            className="py-2.5 pl-10 pr-3 bg-pale rounded w-full"
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-xs mb-1" htmlFor="password">
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-xs font-semibold text-primary-dark hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative flex items-center">
          <LockKeyhole
            color="#6F7973"
            className="absolute left-3.5 h-5 w-5 text-gray-400 pointer-events-none"
          />
          <input
            className="py-2.5 pl-10 pr-3 bg-pale rounded w-full"
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Your password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <label className="flex items-center gap-2.5 cursor-pointer select-none text-sm text-gray-700">
        <input
          type="checkbox"
          name="remember"
          checked={rememberMe}
          onChange={(e) =>
            setRememberMe(e.target.value ? e.target.checked : false)
          }
          className="sr-only"
        />
        <div
          className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
            rememberMe
              ? "bg-primary-dark border-primary-dark"
              : "bg-pale border-[#D1D5DB]"
          }`}
        >
          {rememberMe && <Check className="h-3.5 w-3.5 stroke-3 text-white" />}
        </div>

        <span>Remember credentials</span>
      </label>

      <button
        className="rounded-lg py-3 bg-primary flex items-center justify-center h-11 w-full cursor-pointer hover:bg-primary-dark"
        type="submit"
      >
        <span className="font-bold mr-2 text-white">Log In</span>
        <ArrowRight color="#ffffff" />
      </button>
    </form>
  );
}
