"use client";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileText, SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function Whatsapp() {
  const templates =
    "Yonex Arena Match Summary \n" +
    "Total: $47.50 • $11.88 / person \n" +
    "Pending PayNow/Split: Alex Tan, Kevin L. \n";

  const [text, setText] = useState(templates);

  return (
    <>
      <div className="flex items-center mb-1 md:mb-4">
        <SendHorizontal className="mr-1" />
        <span className="font-bold text-xs md:text-2xl">
          Whatsapp Outgoing Preview
        </span>
      </div>
      <button className="hidden md:flex items-center bg-[#006C4B] py-4 justify-center text-white rounded-xl w-full md:mb-4">
        <FontAwesomeIcon
          className="mr-2 w-12 h-12"
          size="2x"
          icon={faWhatsapp}
        />
        <span className="font-semibold md:text-lg">
          Send Summary via WhatsApp
        </span>
      </button>
      <div className="md:mb-2">
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-lg font-semibold"
        />
      </div>
      <div className="flex justify-end mt-3">
        <button className="flex items-center bg-pale cursor-pointer py-3 px-6 rounded-xl">
          <FileText className="mr-2" />
          <span className="font-bold">Download PDF</span>
        </button>
      </div>
    </>
  );
}
