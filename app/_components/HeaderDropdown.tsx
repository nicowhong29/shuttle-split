import { LogOut } from "lucide-react";

interface HeaderDropdownProps {
  handleOnClick: () => void;
}

export default function HeaderDropdown({ handleOnClick }: HeaderDropdownProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
      <button
        className="bg-white hover:bg-gray-50 rounded-lg flex items-center w-full text-red-500 py-3 px-4 cursor-pointer"
        onClick={handleOnClick}
      >
        <LogOut className="mr-2" />
        <span className="font-bold">Log Out</span>
      </button>
    </div>
  );
}
