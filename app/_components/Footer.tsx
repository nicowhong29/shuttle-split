import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pale">
      <div className="mx-auto max-w-4/5 flex justify-between py-4 px-4 h-16">
        <div className="flex items-center justify-center md:justify-start">
          <Copyright className="mr-2" size={12} />
          <span className="text-sm">
            2025 ShuttleSplit. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
