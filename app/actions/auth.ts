"use server";

import { cookies } from "next/headers";

export async function setDisplayNameCookies(
  firstName: string,
  lastName: string,
) {
  const cookieStore = await cookies();

  cookieStore.set("displayName", `${firstName} ${lastName}`, {
    path: "/",
    maxAge: 604800,
    httpOnly: false,
    sameSite: "lax",
  });
}

export async function getDisplayNameCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("displayName")?.value;
}

export async function clearDisplayNameCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("displayName");
}
