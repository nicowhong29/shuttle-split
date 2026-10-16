interface InputTypeProps {
  title: string;
  placeholder: string;
  allotment: string;
  item: string;
  amount: string;
}

export default function InputType({}: InputTypeProps) {
  return (
    <div className="w-full bg-[#F4F6FF] rounded p-3 transition-all">
      <div className="space-y-1">
        <label
          htmlFor="shuttle-input"
          className="block text-[11px] font-bold text-[#5B6B7C] tracking-wider uppercase select-none"
        >
          TUBE GRADE
        </label>

        <div className="relative flex items-center">
          <input
            id="shuttle-input"
            type="text"
            // value={shuttleName}
            // onChange={(e) => setShuttleName(e.target.value)}
            placeholder="e.g. Yonex AS-30"
            className="bg-transparent text-sm font-bold text-[#101828] focus:outline-none placeholder:text-slate-300"
          />
        </div>

        <div className="flex items-center gap-1.5 text-sm font-normal text-[#64748B] pt-0.5">
          <input
            type="text"
            // value={pcsPerTube}
            // onChange={(e) => setPcsPerTube(e.target.value)}
            className="w-8 bg-transparent text-left focus:outline-none focus:border-b focus:border-slate-400 font-normal"
          />
          <span>pcs / tube</span>
        </div>
      </div>
    </div>
  );
}
