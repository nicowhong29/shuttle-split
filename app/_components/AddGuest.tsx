interface AddGuestProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddGuest({ isOpen, onClose }: AddGuestProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
        {/* Header Section */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#E6F4ED] rounded-xl flex items-center justify-center text-[#006C4B]">
              {/* User Plus Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Add Guest Player
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Add a drop-in player or walk-in buddy to this session&#39;s
                expense split.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Guest Name Input */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Guest Name <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center bg-[#F4F7FE] border border-indigo-50 rounded-xl px-3.5 py-3 text-sm text-gray-900">
              <span className="mr-2 text-[#006C4B]">🪪</span>
              <input
                type="text"
                defaultValue="Liam Tan"
                className="bg-transparent w-full focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Contact Input */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Contact / WhatsApp{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="flex items-center bg-[#F4F7FE] border border-indigo-50 rounded-xl px-3.5 py-3 text-sm text-gray-900">
              <span className="mr-2 text-[#006C4B]">📞</span>
              <input
                type="text"
                defaultValue="+65 9812 3456"
                className="bg-transparent w-full focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded text-[#006C4B] focus:ring-[#006C4B] accent-[#004532]"
            />
            <span className="text-xs text-gray-700 font-medium">
              Save to frequent guest list for future sessions
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50/50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-[#003824] hover:bg-[#00281a] text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
          >
            Add to Session (+1 Player) →
          </button>
        </div>
      </div>
    </div>
  );
}
