"use client";

import { UserRound } from "lucide-react";
import LoginForm from "./LoginForm";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import SocialLoginSection from "@/app/_components/SocialLoginSection";
import SignUpForm from "@/app/_components/SignUpForm";
import { useHexclaveApp } from "@hexclave/next";
import {
  clearDisplayNameCookies,
  setDisplayNameCookies,
} from "../actions/auth";

export default function AuthCard() {
  const app = useHexclaveApp();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [newError, setNewError] = useState<string | null>(null);
  const [newLoading, setNewLoading] = useState(false);

  const currentTab = searchParams.get("tab") === "signup" ? "signup" : "login";

  const handleTabChange = (tab: "signup" | "login") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewError(null);
    setNewLoading(true);
    if (currentTab === "signup") {
      try {
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
        if (fullName) {
          await setDisplayNameCookies(firstName, lastName);
        }
        const result = await app.signUpWithCredential({
          email: newEmail,
          password: newPassword,
        });
        if (result.status === "error") {
          setNewError(result.error.message || "Failed to create account");
          await clearDisplayNameCookies();
          // localStorage.removeItem("displayName");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setNewError(errorMessage);
      } finally {
        setNewLoading(false);
      }
    }
  };

  const handleOAuthSignIn = async (provider: "google") => {
    await app.signInWithOAuth(provider);
  };

  return (
    <div className="bg-white rounded-lg drop-shadow p-5 md:w-1/3 w-full h-full">
      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-xl bg-pale p-1.5 mb-4">
        <button
          type="button"
          onClick={() => handleTabChange("login")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
            currentTab === "login"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("signup")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
            currentTab === "signup"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sign Up
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center">
          <UserRound />
        </div>
      </div>
      <h3 className="font-bold text-center text-lg md:text-3xl">
        {currentTab === "signup"
          ? "Join ShuttleSplit"
          : "Welcome to ShuttleSplit"}
      </h3>
      <p className="text-xs text-center mb-4 md:text-sm">
        {currentTab === "signup"
          ? "Create an account to book courts and automate payouts."
          : "Organize courts, split expenses, and play together."}
      </p>
      {currentTab === "login" ? (
        <LoginForm
          email={email}
          password={password}
          rememberMe={rememberMe}
          showPassword={showPassword}
          setEmail={setEmail}
          setPassword={setPassword}
          setRememberMe={setRememberMe}
          setShowPassword={setShowPassword}
          handleSubmit={handleSubmit}
        />
      ) : (
        <SignUpForm
          firstName={firstName}
          lastName={lastName}
          newEmail={newEmail}
          newPassword={newPassword}
          showPassword={showPassword}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setNewEmail={setNewEmail}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setShowPassword={setShowPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={handleSubmit}
          newLoading={newLoading}
          newError={newError}
        />
      )}
      <SocialLoginSection
        provider={"google"}
        handleOAuthSignIn={handleOAuthSignIn}
      />
    </div>
  );
}
