import { db } from "@/db/db";
import { documents } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const doc = await db
    .select()
    .from(documents)
    .where(eq(documents.id, Number(id)))
    .get();

  return NextResponse.json(doc);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const updated = await db
    .update(documents)
    .set({
      title: body.title,
      content: body.content,
      updatedAt: new Date(),
    })
    .where(eq(documents.id, Number(id)))
    .run();

  return NextResponse.json(updated);
}