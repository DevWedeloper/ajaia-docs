import { describe, it, expect, beforeAll } from "vitest";
import { db } from "@/db/db";
import { users, documents, shares } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

describe("document sharing flow", async () => {
  let aliceId: number;
  let bobId: number;
  let docId: number;

  beforeAll(async () => {
    // Clean tables (important for repeatability)
    await db.delete(shares).run();
    await db.delete(documents).run();
    await db.delete(users).run();

    // Seed users
    const alice = await db.insert(users).values({
      email: "alice@test.com",
      name: "Alice",
    }).returning().get();

    const bob = await db.insert(users).values({
      email: "bob@test.com",
      name: "Bob",
    }).returning().get();

    aliceId = alice.id;
    bobId = bob.id;

    // Create document
    const doc = await db.insert(documents).values({
      title: "Test Doc",
      content: "{}",
      ownerId: aliceId,
    }).returning().get();

    docId = doc.id;
  });

  it("allows owner to share document", async () => {
    await db.insert(shares).values({
      documentId: docId,
      userId: bobId,
    }).run();

    const shared = await db
      .select()
      .from(shares)
      .where(eq(shares.userId, bobId))
      .all();

    expect(shared.length).toBe(1);
    expect(shared[0].documentId).toBe(docId);
  });

  it("bob can access shared document", async () => {
    const sharedRows = await db
      .select()
      .from(shares)
      .where(eq(shares.userId, bobId))
      .all();

    const sharedIds = sharedRows.map(s => s.documentId);

    const docs = await db
      .select()
      .from(documents)
      .where(inArray(documents.id, sharedIds))
      .all();

    expect(docs.length).toBe(1);
    expect(docs[0].id).toBe(docId);
  });
});