import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import Features, { FeaturesProps } from "@/app/_components/Features";
import Badminton from "@/public/icons/badminton.png";
import Whatsapp from "@/public/icons/whatsapp.png";
import HomeCard from "@/app/_components/HomeCard";
import Highlights, { HighlightsProps } from "@/app/_components/Highlights";
import { Calculator, ChartPie, Share2 } from "lucide-react";

const features: FeaturesProps[] = [
  { icon: Badminton, text: "Court Fee Calculator" },
  { icon: Whatsapp, text: "WhatsApp Group Settlement" },
];

const highlights: HighlightsProps[] = [
  {
    icon: <Calculator />,
    title: "Dynamic Court Ledger",
    description:
      "Automatic hourly rate calculation with split costs across doubles, singles, and subbed- in players.",
    leftInfo: "Court booking + Shuttles",
    rightInfo: "Zero dispute",
  },
  {
    icon: <ChartPie />,
    title: "Shuttle Tally Counter",
    description:
      "Log feather and nylon shuttle tubes used mid-session. Automatically divided among active players only.",
    leftInfo: "Tubes logged live",
    rightInfo: "Pay-as-you-play",
  },
  {
    icon: <Share2 />,
    title: "One-Click WhatsApp Broadcast",
    description:
      "Export formatted break-ups straight to your WhatsApp group with one-tap payment request links.",
    leftInfo: "Instant breakdown link",
    rightInfo: "Fast settlement",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <section className="px-6 md:px-0 md:mx-auto pt-10 flex-1 max-w-5xl mb-10">
        <div className="flex items-center mb-6 justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-700 text-white mr-2">
            🏸
          </span>
          <h1 className="font-bold text-4xl md:text-5xl">
            Shuttle<span className="text-primary">Split</span>
          </h1>
        </div>
        <h2 className="font-bold text-4xl md:text-5xl text-center mb-3">
          Match day costs,{" "}
          <span className="font-bold text-primary underline">
            perfectly <br className="md:block hidden" />
            divided
          </span>
          .
        </h2>
        <p className="mb-6 text-center">
          Split court fees, track shuttles, and settle up with your squad in
          seconds. <br /> Zero awkward math after match point.
        </p>
        <div className="flex items-center justify-center flex-col md:flex-row gap-3 pb-10 w-full">
          {features.map((feature, index) => (
            <Features key={index} icon={feature.icon} text={feature.text} />
          ))}
        </div>
        <div className="mb-10 md:mb-16 flex justify-center">
          <HomeCard />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-6">
          {highlights.map((highlight, index) => (
            <Highlights
              key={index}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
              leftInfo={highlight.leftInfo}
              rightInfo={highlight.rightInfo}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
