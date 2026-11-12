interface PlayersProps {
  initials: string;
  name: string;
  isHost?: boolean;
}

export default function Players({ initials, name, isHost = false }: PlayersProps) {
  return (
    <div className="flex items-center rounded bg-pale p-2.5">
      <span className="bg-primary text-white font-bold mr-3 w-10 h-10 flex items-center justify-center rounded-full text-xs shrink-0">
        {initials}
      </span>
      <div className="min-w-0">
        <div className="font-bold truncate">{name}</div>
        {isHost && (
          <div className="text-[10px] font-bold uppercase tracking-wider text-primary-dark">
            Host
          </div>
        )}
      </div>
    </div>
  );
}
