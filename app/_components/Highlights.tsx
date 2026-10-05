export interface HighlightsProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  leftInfo: string;
  rightInfo: string;
}

export default function Highlights({
  icon,
  title,
  description,
  leftInfo,
  rightInfo,
}: HighlightsProps) {
  return (
    <div className="bg-white rounded-xl drop-shadow flex flex-col">
      <div className="flex-1">
        <div className="px-6 pt-6 mb-2">
          <span className="h-10 w-10 rounded-xl bg-primary-light p-1 flex items-center justify-center">
            {icon}
          </span>
        </div>
        <h3 className="text-base font-bold text-dark mb-1 px-6">{title}</h3>
        <p className="text-sm px-6 pb-4">{description}</p>
      </div>
      <div className="flex justify-between items-center py-2 px-6 bg-pale rounded-bl-xl rounded-br-xl">
        <span className="font-semibold text-xs">{leftInfo}</span>
        <span className="font-semibold text-xs">{rightInfo}</span>
      </div>
    </div>
  );
}
