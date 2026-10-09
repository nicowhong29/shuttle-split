interface CardsProps {
  title: string;
  icon: React.ReactElement;
  smallIcon: React.ReactElement;
  info: string;
  secondaryInfo?: string;
  smallInfo: string;
}

export default function Cards({
  title,
  icon,
  smallIcon,
  info,
  secondaryInfo,
  smallInfo,
}: CardsProps) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow">
      <div className="flex pb-8 border-b border-b-pale mb-5 items-start">
        <div className="flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 mb-3">
            {title.toLocaleUpperCase()}
          </h3>
          <div className="flex items-baseline">
            <span className="text-5xl font-bold mr-1">{info}</span>
            <span className="text-base font-semibold text-primary-dark">
              {secondaryInfo}
            </span>
          </div>
        </div>
        <div className="bg-pale rounded-2xl p-4">{icon}</div>
      </div>
      <div className="flex items-center">
        <span className="mr-2">{smallIcon}</span>
        <span className="text-sm">{smallInfo}</span>
      </div>
    </div>
  );
}
