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
import Details, { type DetailsProps } from "@/app/_components/Details";
import { hexclaveServerApp } from "@/app/hexclave/server";
import { sql } from "@/app/lib/db";
import { redirect } from "next/navigation";

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

export default async function Dashboard() {
  const user = await hexclaveServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  const sessions = await sql`
    SELECT
      s.id,
      s.venue_name,
      s.court_number,
      TO_CHAR(s.court_time, 'HH12:MI AM') AS court_time,
      TO_CHAR(s.session_date, 'Mon DD, YYYY') AS session_date,
      s.court_cost,
      s.court_duration,
      s.shuttle_type,
      s.shuttle_cost,
      COALESCE(s.shuttles_used, 0) AS shuttles_used,
      s.total_cost,
      COUNT(p.id)::integer AS total_players,
      COUNT(p.id) FILTER (WHERE p.has_paid = true)::integer AS players_paid
    FROM sessions s
    LEFT JOIN session_participants p ON p.session_id = s.id
    WHERE s.organizer_id = ${user.id}
    GROUP BY s.id
    ORDER BY s.session_date DESC
  `;

  const sessionCards: (DetailsProps & { id: string })[] = sessions.map(
    (session) => {
      const totalPlayers = Number(session.total_players);
      const totalCost = Number(session.total_cost);

      return {
        id: session.id,
        courtNumber: String(session.court_number),
        venue: session.venue_name,
        date: session.session_date,
        time: session.court_time,
        duration: String(session.court_duration),
        courtPrice: `RM ${Number(session.court_cost).toFixed(2)}`,
        shuttlePrice: `RM ${Number(session.shuttle_cost).toFixed(2)}`,
        totalPrice: `RM ${totalCost.toFixed(2)}`,
        individualPrice: `RM ${
          totalPlayers > 0 ? (totalCost / totalPlayers).toFixed(2) : "0.00"
        }`,
        playersPaid: String(session.players_paid),
        totalPlayers: String(totalPlayers),
        numberOfShuttles: String(session.shuttles_used),
        typeOfShuttles: session.shuttle_type,
      };
    },
  );

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
      {sessionCards.length === 0 ? (
        <div className="text-center text-3xl font-bold">
          No sessions available
        </div>
      ) : (
        sessionCards.map((session) => <Details key={session.id} {...session} />)
      )}
    </section>
  );
}
