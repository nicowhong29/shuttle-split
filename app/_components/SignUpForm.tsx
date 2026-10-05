"use client";

import { ArrowRight, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface SignUpFormProps {
  newEmail: string;
  newPassword: string;
  confirmPassword: string;
  showPassword: boolean;
  setNewEmail: Dispatch<SetStateAction<string>>;
  setNewPassword: Dispatch<SetStateAction<string>>;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function SignUpForm({
  newEmail,
  newPassword,
  confirmPassword,
  showPassword,
  setNewEmail,
  setNewPassword,
  setShowPassword,
  setConfirmPassword,
  handleSubmit,
}: SignUpFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm md:max-w-full"
    >
      <div className="flex flex-col mb-">
        <label className="font-semibold text-xs mb-1" htmlFor="newEmail">
          New Email
        </label>
        <div className="relative flex items-center">
          <UserRound
            color="#6F7973"
            className="absolute left-3.5 h-5 w-5 text-gray-400 pointer-events-none"
          />
          <input
            className="py-2.5 pl-10 pr-3 bg-pale rounded w-full"
            id="newEmail"
            type="email"
            name="newEmail"
            autoComplete="newEmail"
            required
            placeholder="Your email address"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-xs mb-1" htmlFor="newPassword">
            Password
          </label>
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
            name="newPassword"
            placeholder="Your password"
            autoComplete="current-password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-xs mb-1" htmlFor="password">
            Confirm Password
          </label>
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
            placeholder="Confirm password"
            autoComplete="confirm-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

      <button
        className="rounded-lg py-3 bg-primary flex items-center justify-center h-11 w-full cursor-pointer hover:bg-primary-dark"
        type="submit"
      >
        <span className="font-bold mr-2 text-white">Get Started • Sign Up</span>
        <ArrowRight color="#ffffff" />
      </button>
    </form>
  );
}
