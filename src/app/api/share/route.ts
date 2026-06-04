import { db } from "@/db/db";
import { shares } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();

  const { documentId, userId } = body;

  // Prevent duplicate sharing
  const existing = db
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
    db.insert(shares).values({
      documentId,
      userId,
    }).run();
  }

  return NextResponse.json({ success: true });
}