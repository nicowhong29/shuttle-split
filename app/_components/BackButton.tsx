import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  link: string;
  title: string;
}

export default function BackButton({ link, title }: BackButtonProps) {
  return (
    <Link
      className="inline-flex items-center bg-white rounded-lg py-1 px-2 mb-6 shadow font-semibold"
      href="/dashboard"
    >
      <ArrowLeft className="mr-2" size={14} />
      <span className="text-sm">Back to Dashboard</span>
    </Link>
  );
}
