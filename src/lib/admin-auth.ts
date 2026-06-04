import { cookies } from "next/headers";

const ADMIN_COOKIE = "sgt_admin_session";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "sgt-admin-2024";
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  return session?.value === getAdminPassword();
}

export async function setAdminSession(password: string): Promise<boolean> {
  if (password !== getAdminPassword()) return false;
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return true;
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
