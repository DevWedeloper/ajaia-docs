import { db } from "@/db/db";
import { shares } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();

  const { documentId, userId } = body;

  // Prevent duplicate sharing
  const existing = await db
    .select()
    .from(shares)
    .where(
      and(
        eq(shares.documentId, documentId),
        eq(shares.userId, userId)
      )
    )
    .get();

  if (!existing) {
    await db.insert(shares).values({
      documentId,
      userId,
    }).run();
  }

  return NextResponse.json({ success: true });
}