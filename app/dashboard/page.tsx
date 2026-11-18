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

const sessionSortOptions = [
  "recent",
  "unpaid",
  "paid",
  "price-asc",
  "price-desc",
] as const;

type SessionSort = (typeof sessionSortOptions)[number];

function isSessionSort(value: string | undefined): value is SessionSort {
  return sessionSortOptions.some((option) => option === value);
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const user = await hexclaveServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  const sortParam = (await searchParams).sort;
  const requestedSort = typeof sortParam === "string" ? sortParam : undefined;
  const sort = isSessionSort(requestedSort) ? requestedSort : "recent";

  const [sessions, upcomingSummaryRows] = await Promise.all([
    sql`
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
    ORDER BY
      CASE
        WHEN ${sort} = 'unpaid'
        THEN COUNT(p.id) FILTER (WHERE p.has_paid IS NOT TRUE)
      END DESC,
      CASE
        WHEN ${sort} = 'paid'
        THEN (
          COUNT(p.id) > 0 AND
          COUNT(p.id) FILTER (WHERE p.has_paid IS NOT TRUE) = 0
        )::integer
      END DESC,
      CASE WHEN ${sort} = 'price-asc' THEN s.total_cost END ASC,
      CASE WHEN ${sort} = 'price-desc' THEN s.total_cost END DESC,
      s.session_date DESC,
      s.court_time DESC
    `,
    sql`
      SELECT
        COUNT(DISTINCT s.id) FILTER (
          WHERE s.session_date::date >
            (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kuala_Lumpur')::date
        )::integer AS upcoming_count,
        COALESCE(
          SUM(p.amount_owed) FILTER (WHERE p.has_paid IS NOT TRUE),
          0
        ) AS unpaid_amount,
        COUNT(p.id) FILTER (WHERE p.has_paid IS NOT TRUE)::integer
          AS unpaid_player_count,
        (
          SELECT COALESCE(SUM(COALESCE(usage_session.shuttles_used, 0)), 0)::integer
          FROM sessions usage_session
          WHERE usage_session.organizer_id = ${user.id}
        ) AS total_shuttles_used,
        (
          SELECT usage_session.shuttle_type
          FROM sessions usage_session
          WHERE usage_session.organizer_id = ${user.id}
          GROUP BY usage_session.shuttle_type
          HAVING SUM(COALESCE(usage_session.shuttles_used, 0)) > 0
          ORDER BY
            SUM(COALESCE(usage_session.shuttles_used, 0)) DESC,
            usage_session.shuttle_type ASC
          LIMIT 1
        ) AS most_used_shuttle_type,
        (
          SELECT
            'Next: ' ||
            TO_CHAR(next_session.session_date, 'Dy, Mon DD') ||
            ', ' ||
            COALESCE(
              TO_CHAR(next_session.court_time, 'HH12:MI AM'),
              'Time not set'
            ) ||
            ' at ' ||
            next_session.venue_name
          FROM sessions next_session
          WHERE next_session.organizer_id = ${user.id}
            AND next_session.session_date::date >
              (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kuala_Lumpur')::date
          ORDER BY
            next_session.session_date::date ASC,
            next_session.court_time ASC NULLS LAST
          LIMIT 1
        ) AS next_session_info
      FROM sessions s
      LEFT JOIN session_participants p ON p.session_id = s.id
      WHERE s.organizer_id = ${user.id}
    `,
  ]);
  const upcomingSummary = upcomingSummaryRows[0];
  const unpaidPlayerCount = Number(upcomingSummary?.unpaid_player_count ?? 0);

  const dashboards = [
    {
      id: 1,
      title: "upcoming sessions",
      icon: <CalendarCheck className="text-primary-dark" />,
      smallIcon: <Clock size={20} />,
      info: String(upcomingSummary?.upcoming_count ?? 0),
      secondaryInfo: "Scheduled",
      smallInfo: upcomingSummary?.next_session_info ?? "No upcoming sessions",
    },
    {
      id: 2,
      title: "outstanding unpaid",
      icon: <Wallet />,
      smallIcon: <UserGroup />,
      info: `RM ${Number(upcomingSummary?.unpaid_amount ?? 0).toFixed(2)}`,
      smallInfo: `${unpaidPlayerCount} player${unpaidPlayerCount === 1 ? "" : "s"} pending payment`,
    },
    {
      id: 3,
      title: "shuttles used",
      icon: <BowArrow />,
      smallIcon: <Whistle />,
      info: String(upcomingSummary?.total_shuttles_used ?? 0),
      smallInfo: upcomingSummary?.most_used_shuttle_type
        ? `${upcomingSummary.most_used_shuttle_type} used most`
        : "No shuttle usage recorded",
    },
  ];

  const sessionCards: DetailsProps[] = sessions.map((session) => {
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
    });
  const venues = Array.from(
    new Set(sessions.map((session) => session.venue_name)),
  ).sort((first, second) => first.localeCompare(second));

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
        <FilterSection
          sessionCount={sessions.length}
          venues={venues}
          sort={sort}
        />
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
