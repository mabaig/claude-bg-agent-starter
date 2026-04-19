import { db } from "@/db";
import { waitlist } from "@/db/schema/waitlist";
import { eq } from "drizzle-orm";

export async function addToWaitlist(email: string, name?: string) {
  const [row] = await db
    .insert(waitlist)
    .values({ email: email.toLowerCase().trim(), name })
    .onConflictDoNothing()
    .returning();
  return row ?? null; // null means already signed up
}

export async function getWaitlistCount() {
  const rows = await db.select().from(waitlist);
  return rows.length;
}

export async function getAllWaitlist() {
  return db.select().from(waitlist).orderBy(waitlist.createdAt);
}
