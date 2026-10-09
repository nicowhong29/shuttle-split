import Cards from "@/app/_components/Cards";
import {
  BowArrow,
  CalendarCheck,
  Clock,
  UserGroup,
  Wallet,
  Whistle,
} from "lucide-react";
import FilterSection from "@/app/_components/FilterSection";
import Details from "@/app/_components/Details";

const dashboards = [
  {
    id: 1,
    title: "upcoming sessions",
    icon: <CalendarCheck className="text-primary-dark" />,
    smallIcon: <Clock size={20} />,
    info: "2",
    secondaryInfo: "Scheduled",
    smallInfo: "Next: Thu, 7:00 PM at Downtown Sports",
  },
  {
    id: 2,
    title: "outstanding unpaid",
    icon: <Wallet />,
    smallIcon: <UserGroup />,
    info: "$48.50",
    smallInfo: "4 players pending payment",
  },
  {
    id: 3,
    title: "shuttles used",
    icon: <BowArrow />,
    smallIcon: <Whistle />,
    info: "15",
    smallInfo: "Yonex AS-30 avg",
  },
];

const sessions = [
  {
    id: 1,
    courtNumber: "12",
    venue: "222 Badminton Court",
    date: "10 Oct",
    time: "9.30 AM",
    duration: "1.5",
    players: "Nico, Aqeemul",
    courtPrice: "RM 12.00",
    shuttlePrice: "RM 2",
    totalPrice: "RM 24.00",
    individualPrice: "RM 6.00",
    playersPaid: "1",
    totalPlayers: "2",
    remainingPaid: "RM 6.00",
    numberOfShuttles: "1",
    typeOfShuttles: "Yonex AS-30",
  },
  {
    id: 2,
    courtNumber: "6",
    venue: "222 Badminton Court",
    date: "20 Oct",
    time: "8.30 AM",
    duration: "1.5",
    players: "Nico, Aqeemul, Han Wey",
    courtPrice: "RM 12.00",
    shuttlePrice: "RM 2",
    totalPrice: "RM 24.00",
    individualPrice: "RM 6.00",
    playersPaid: "1",
    totalPlayers: "3",
    numberOfShuttles: "3",
    typeOfShuttles: "Yonex AS-30",
  },
  {
    id: 3,
    courtNumber: "6",
    venue: "222 Badminton Court",
    date: "20 Oct",
    time: "8.30 AM",
    duration: "1.5",
    players: "Nico, Aqeemul, Han Wey",
    courtPrice: "RM 12.00",
    shuttlePrice: "RM 2",
    totalPrice: "RM 24.00",
    individualPrice: "RM 6.00",
    playersPaid: "1",
    totalPlayers: "3",
    numberOfShuttles: "4",
    typeOfShuttles: "Yonex AS-30",
  },
];

export default function Dashboard() {
  return (
    <section className="md:mx-auto pt-10 flex-1 max-w-full md:max-w-4/5 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {dashboards.map((dash) => (
          <Cards
            key={dash.id}
            title={dash.title}
            icon={dash.icon}
            smallIcon={dash.smallIcon}
            info={dash.info}
            smallInfo={dash.smallInfo}
            secondaryInfo={dash.secondaryInfo}
          />
        ))}
      </div>
      <div className="mb-6">
        <FilterSection />
      </div>
      <h2 className="text-2xl font-semibold mb-6">Sessions</h2>
      {sessions.map((session) => (
        <Details key={session.id} {...session} />
      ))}
    </section>
  );
}
