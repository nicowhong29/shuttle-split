interface InputTypeProps {
  field: "tubeType" | "tubePrice";
  value: string;
  title: string;
  placeholder: string;
  allotment: string;
  amount: string;
  onChange: (value: string) => void;
}

export default function InputType({
  field,
  value,
  title,
  placeholder,
  allotment,
  amount,
  onChange,
}: InputTypeProps) {
  const isPrice = field === "tubePrice";

  return (
    <div className="w-full bg-[#F4F6FF] rounded p-3 transition-all">
      <div className="space-y-1">
        <label
          htmlFor={`tube-${field}`}
          className="block text-[11px] font-bold text-[#5B6B7C] tracking-wider uppercase select-none"
        >
          {title}
        </label>

        <div className="relative flex items-center">
          <input
            id={`tube-${field}`}
            type="text"
            inputMode={isPrice ? "decimal" : undefined}
            value={value}
            onChange={(e) => {
              if (!isPrice) {
                onChange(e.target.value);
                return;
              }

              const sanitized = e.target.value.replace(/[^0-9.]/g, "");
              const [whole, ...decimalParts] = sanitized.split(".");
              const price =
                decimalParts.length > 0
                  ? `${whole}.${decimalParts.join("").slice(0, 2)}`
                  : whole;
              onChange(price);
            }}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm font-bold text-[#101828] focus:outline-none placeholder:text-slate-300"
          />
        </div>
        <div className="text-sm font-normal text-[#64748B] pt-0.5">
          <span>
            {amount} {allotment}
          </span>
        </div>
      </div>
    </div>
  );
}
