import { db } from "@/db/db";
import { documents, shares } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, inArray } from "drizzle-orm";
import { getUserId } from "@/lib/getUserId";

export async function GET(req: Request) {
  const userId = getUserId(req);

  // Owned docs
  const owned = db
    .select()
    .from(documents)
    .where(eq(documents.ownerId, userId))
    .all();

  const sharedRows = db
    .select()
    .from(shares)
    .where(eq(shares.userId, userId))
    .all();

  const sharedIds = sharedRows.map(r => r.documentId);

  const shared = sharedIds.length
    ? db
        .select()
        .from(documents)
        .where(inArray(documents.id, sharedIds))
        .all()
    : [];

  return NextResponse.json({ owned, shared });
}

export async function POST(req: Request) {
  const userId = getUserId(req);

  const body = await req.json();

  const title = body.title ?? "Untitled Document";

  const result = db
    .insert(documents)
    .values({
      title,
      content: "{}",
      ownerId: userId,
    })
    .returning()
    .all();

  return NextResponse.json(result[0]);
}