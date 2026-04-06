import { cookies } from "next/headers";

export interface SessionUser {
  id: string;
  username: string;
  name: string;
  role: string; // admin, engineer, viewer
}

const SESSION_COOKIE = "benka_session";

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function encodeSession(user: SessionUser): string {
  return JSON.stringify(user);
}

export { SESSION_COOKIE };
