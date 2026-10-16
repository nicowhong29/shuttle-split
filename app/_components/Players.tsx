interface PlayersProps {
  initials: string;
  name: string;
}

export default function Players({ initials, name }: PlayersProps) {
  return (
    <div className="flex items-center rounded bg-pale p-2.5">
      <span className="bg-primary text-white font-bold mr-3 w-10 h-10 flex items-center justify-center rounded-full text-xs shrink-0">
        {initials}
      </span>
      <div className="font-bold truncate">{name}</div>
    </div>
  );
}
