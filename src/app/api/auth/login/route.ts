import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-data";
import { encodeSession, SESSION_COOKIE, type SessionUser } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password required" }, { status: 400 });
  }

  // Find user by username and password (mock data for now)
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const session: SessionUser = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  };

  const response = NextResponse.json({ ok: true, user: session });
  response.cookies.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });

  return response;
}
