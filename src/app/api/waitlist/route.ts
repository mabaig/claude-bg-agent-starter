import { NextResponse } from "next/server";
import { addToWaitlist, getWaitlistCount } from "@/db/queries/waitlist";

export async function POST(req: Request) {
  const { email, name } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const row = await addToWaitlist(email, name || undefined);

  if (!row) {
    return NextResponse.json({ alreadySignedUp: true, message: "You're already on the list! 🎉" });
  }

  const count = await getWaitlistCount();
  return NextResponse.json({ success: true, message: "You're on the list!", count });
}

export async function GET() {
  const count = await getWaitlistCount();
  return NextResponse.json({ count });
}
