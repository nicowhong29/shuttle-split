import { ArrowRight, AtSign, ChevronRight, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function ResetPassword() {
  return (
    <div className="bg-white rounded-lg drop-shadow p-5 md:w-1/3 w-full h-full">
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center">
          <LockKeyhole />
        </div>
      </div>
      <h3 className="font-bold text-center text-lg md:text-3xl">
        Reset your password
      </h3>
      <p className="text-xs text-center mb-4 md:text-sm">
        Enter your registered email and we&#39;ll send you a link to reset your
        court credentials.
      </p>
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm md:max-w-full mb-6"
      >
        <div className="flex flex-col mb-">
          <label className="font-semibold text-xs mb-1" htmlFor="username">
            Email
          </label>
          <div className="relative flex items-center">
            <AtSign
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
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          className="rounded-lg py-3 bg-primary flex items-center justify-center h-11 w-full cursor-pointer hover:bg-primary-dark"
          type="submit"
        >
          <span className="font-bold mr-2 text-white">Send Reset Link</span>
          <ArrowRight color="#ffffff" />
        </button>
      </form>

      <div className="bg-pale p-4 rounded-2xl">
        <p className="text-sm flex items-center justify-center">
          <span className="mr-2">Remember your password?</span>
          <Link
            className="flex items-center font-bold text-primary-dark cursor-pointer"
            href="/auth?tab=login"
          >
            <span className="mr-1 text-sm">Log in</span>{" "}
            <ChevronRight size={16} />
          </Link>
        </p>
      </div>
    </div>
  );
}
