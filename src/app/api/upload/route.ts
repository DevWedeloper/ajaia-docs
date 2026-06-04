import { db } from "@/db/db";
import { documents } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    );
  }

  const userId = Number(req.headers.get("x-user-id") || 1);

  const text = await file.text();

  const content = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text }],
      },
    ],
  };

  const doc = db
    .insert(documents)
    .values({
      title: file.name,
      content: JSON.stringify(content),
      ownerId: userId,
    })
    .returning()
    .get();

  return NextResponse.json(doc);
}