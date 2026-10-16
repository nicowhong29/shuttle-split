import BackButton from "@/app/_components/BackButton";
import { ReceiptText } from "lucide-react";

export default function Page() {
  return (
    <section className="md:mx-auto flex-1 max-w-full md:max-w-4/5 mb-6">
      <BackButton title="Back to Dashboard" link="/dashboard" />
      <div className="flex items-center justify-between">
        <div className="flex flex-col mb-4">
          <h1 className="text-4xl font-bold mb-1">Session Receipt & Split</h1>
          <p>
            Session finalized for Yonex Arena • Match #14. Review receipt
            breakdown, track player payments, and distribute collection
            requests.
          </p>
        </div>
        <button className="flex shrink-0 items-center bg-primary text-white py-2 px-4 rounded-lg">
          <ReceiptText className="mr-2" />
          <span className="font-bold">Print Receipt</span>
        </button>
      </div>
    </section>
  );
}
