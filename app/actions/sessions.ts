"use server";

import { hexclaveServerApp } from "@/app/hexclave/server";
import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

interface CreateSessionInput {
  venue: string;
  courtNumber: number;
  courtTime: string;
  sessionDate: string;
  courtCost: number;
  courtDuration: number;
  shuttleType: string;
  tubePrice: number;
  shuttlesUsed: number;
  guests: GuestInput[];
}

interface GuestInput {
  name: string;
  phoneNumber: string;
}

type CreateSessionResult =
  | { sessionId: string; participantCount: number }
  | { error: string };

function isGuestInput(value: unknown): value is GuestInput {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const guest = value as Record<string, unknown>;
  return (
    typeof guest.name === "string" &&
    typeof guest.phoneNumber === "string"
  );
}

function isCreateSessionInput(value: unknown): value is CreateSessionInput {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const input = value as Record<string, unknown>;
  return (
    typeof input.venue === "string" &&
    typeof input.courtNumber === "number" &&
    typeof input.courtTime === "string" &&
    typeof input.sessionDate === "string" &&
    typeof input.courtCost === "number" &&
    typeof input.courtDuration === "number" &&
    typeof input.shuttleType === "string" &&
    typeof input.tubePrice === "number" &&
    typeof input.shuttlesUsed === "number" &&
    Array.isArray(input.guests) &&
    input.guests.every(isGuestInput)
  );
}

function toCents(amount: number) {
  return Math.round(amount * 100);
}

export async function createSession(
  input: unknown,
): Promise<CreateSessionResult> {
  const user = await hexclaveServerApp.getUser();
  if (!user) {
    return { error: "Please sign in before creating a session." };
  }

  if (!isCreateSessionInput(input)) {
    return { error: "The session details are invalid." };
  }

  const venueName = input.venue.trim();
  const shuttleType = input.shuttleType.trim();
  const hostName = user.displayName?.trim() || "Host";
  const guests = input.guests.map((guest) => ({
    name: guest.name.trim(),
    phoneNumber: guest.phoneNumber.trim() || null,
  }));
  const participantNames = [hostName, ...guests.map((guest) => guest.name)];
  const dateIsValid =
    /^\d{4}-\d{2}-\d{2}$/.test(input.sessionDate) &&
    !Number.isNaN(Date.parse(`${input.sessionDate}T00:00:00Z`)) &&
    new Date(`${input.sessionDate}T00:00:00Z`)
      .toISOString()
      .startsWith(input.sessionDate);
  const courtTimeIsValid =
    /^(?:[01]\d|2[0-3]):(?:00|30)$/.test(input.courtTime);

  if (
    !venueName ||
    !Number.isInteger(input.courtNumber) ||
    input.courtNumber < 1 ||
    !courtTimeIsValid ||
    !dateIsValid ||
    !Number.isFinite(input.courtCost) ||
    input.courtCost < 0 ||
    !Number.isFinite(input.courtDuration) ||
    input.courtDuration <= 0 ||
    !shuttleType ||
    !Number.isFinite(input.tubePrice) ||
    input.tubePrice < 0 ||
    !Number.isInteger(input.shuttlesUsed) ||
    input.shuttlesUsed < 0 ||
    participantNames.some((name) => !name || name.length > 255)
  ) {
    return { error: "Check the session details and try again." };
  }

  const courtCostCents = toCents(input.courtCost);
  const tubePriceCents = toCents(input.tubePrice);
  const shuttleCostCents = Math.round(
    (tubePriceCents * input.shuttlesUsed) / 12,
  );
  const totalCostCents = courtCostCents + shuttleCostCents;

  if (
    !Number.isSafeInteger(courtCostCents) ||
    !Number.isSafeInteger(tubePriceCents * input.shuttlesUsed) ||
    !Number.isSafeInteger(totalCostCents)
  ) {
    return { error: "The cost is too large to save." };
  }

  const participants = [{ name: hostName, phoneNumber: null }, ...guests];
  const baseShareCents = Math.floor(totalCostCents / participants.length);
  const extraCentCount = totalCostCents % participants.length;

  if (
    baseShareCents + (extraCentCount > 0 ? 1 : 0) > 9_999_999_999
  ) {
    return { error: "A player's share is too large to save." };
  }

  const participantRows = participants.map((participant, index) => ({
    name: participant.name,
    amount_owed: (
      (baseShareCents + (index < extraCentCount ? 1 : 0)) /
      100
    ).toFixed(2),
    has_paid: index === 0,
    phone_number: participant.phoneNumber,
  }));

  try {
    const rows = await sql`
      WITH inserted_session AS (
        INSERT INTO sessions (
          organizer_id,
          venue_name,
          court_number,
          court_time,
          session_date,
          court_cost,
          court_duration,
          shuttle_type,
          shuttles_used,
          shuttle_cost,
          total_cost
        )
        VALUES (
          ${user.id},
          ${venueName},
          ${input.courtNumber},
          ${input.courtTime},
          ${input.sessionDate},
          ${courtCostCents / 100},
          ${input.courtDuration},
          ${shuttleType},
          ${input.shuttlesUsed},
          ${shuttleCostCents / 100},
          ${totalCostCents / 100}
        )
        RETURNING id
      ),
      inserted_participants AS (
        INSERT INTO session_participants (
          session_id,
          name,
          amount_owed,
          has_paid,
          phone_number
        )
        SELECT
          inserted_session.id,
          participant.name,
          participant.amount_owed,
          participant.has_paid,
          participant.phone_number
        FROM inserted_session
        CROSS JOIN jsonb_to_recordset(${JSON.stringify(participantRows)}::jsonb)
          AS participant(
            name text,
            amount_owed numeric,
            has_paid boolean,
            phone_number text
          )
        RETURNING id
      )
      SELECT
        inserted_session.id,
        (SELECT count(*)::integer FROM inserted_participants) AS participant_count
      FROM inserted_session
    `;

    const result = rows[0];
    if (
      typeof result?.id !== "string" ||
      typeof result.participant_count !== "number"
    ) {
      throw new Error("The saved session did not return its expected details.");
    }

    return {
      sessionId: result.id,
      participantCount: result.participant_count,
    };
  } catch (error) {
    console.error("Failed to save session to Neon.", error);
    return { error: "Could not save the session. Please try again." };
  }
}

export async function markParticipantPaid(
  sessionId: string,
  participantId: string,
): Promise<{ success: true } | { error: string }> {
  const user = await hexclaveServerApp.getUser();
  if (!user) {
    return { error: "Please sign in to update payment status." };
  }

  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(sessionId) || !uuidPattern.test(participantId)) {
    return { error: "The session or participant ID is invalid." };
  }

  try {
    const updatedParticipants = await sql`
      UPDATE session_participants AS participant
      SET has_paid = true
      FROM sessions AS session
      WHERE participant.id = ${participantId}
        AND participant.session_id = session.id
        AND session.id = ${sessionId}
        AND session.organizer_id = ${user.id}
      RETURNING participant.id
    `;

    if (updatedParticipants.length === 0) {
      return { error: "Could not find that participant in your session." };
    }

    revalidatePath(`/session/${sessionId}`);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to mark participant as paid.", error);
    return { error: "Could not update payment status. Please try again." };
  }
}
