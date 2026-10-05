import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeCard() {
  return (
    <div className="md:p-10 p-5 bg-white rounded-3xl drop-shadow-sm">
      <Link href="/auth?tab=login">
        <button className="flex mb-5 py-3.5 px-4 bg-primary-dark hover:bg-primary transition text-white font-bold items-center rounded-xl cursor-pointer w-full justify-center">
          <span className="mr-2">Get Started • Sign Up</span>
          <ArrowRight />
        </button>
      </Link>
      <p className="font-semibold text-xs text-center mb-1.5">
        New to ShuttleSplit? Create an account in 30 seconds
      </p>
      <Link href="/auth?tab=signup">
        <button className="flex py-3.5 px-4 bg-pale hover:bg-pale-dark transition font-bold rounded-xl w-full cursor-pointer justify-center">
          <span>Log In to Existing Account</span>
        </button>
      </Link>
    </div>
  );
}
