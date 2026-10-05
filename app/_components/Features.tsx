import Image, { StaticImageData } from "next/image";

export interface FeaturesProps {
  icon: StaticImageData;
  text: string;
}

export default function Features({ icon, text }: FeaturesProps) {
  return (
    <div className="flex items-center px-3 py-2 bg-white drop-shadow-sm rounded-3xl">
      <Image className="pr-1.5" src={icon} alt={text} width={32} height={32} />
      <span className="font-bold text-sm">{text}</span>
    </div>
  );
}
