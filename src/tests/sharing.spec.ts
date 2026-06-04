import { describe, it, expect, beforeAll } from "vitest";
import { db } from "@/db/db";
import { users, documents, shares } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

describe("document sharing flow", () => {
  let aliceId: number;
  let bobId: number;
  let docId: number;

  beforeAll(() => {
    // Clean tables (important for repeatability)
    db.delete(shares).run();
    db.delete(documents).run();
    db.delete(users).run();

    // Seed users
    const alice = db.insert(users).values({
      email: "alice@test.com",
      name: "Alice",
    }).returning().get();

    const bob = db.insert(users).values({
      email: "bob@test.com",
      name: "Bob",
    }).returning().get();

    aliceId = alice.id;
    bobId = bob.id;

    // Create document
    const doc = db.insert(documents).values({
      title: "Test Doc",
      content: "{}",
      ownerId: aliceId,
    }).returning().get();

    docId = doc.id;
  });

  it("allows owner to share document", () => {
    db.insert(shares).values({
      documentId: docId,
      userId: bobId,
    }).run();

    const shared = db
      .select()
      .from(shares)
      .where(eq(shares.userId, bobId))
      .all();

    expect(shared.length).toBe(1);
    expect(shared[0].documentId).toBe(docId);
  });

  it("bob can access shared document", () => {
    const sharedRows = db
      .select()
      .from(shares)
      .where(eq(shares.userId, bobId))
      .all();

    const sharedIds = sharedRows.map(s => s.documentId);

    const docs = db
      .select()
      .from(documents)
      .where(inArray(documents.id, sharedIds))
      .all();

    expect(docs.length).toBe(1);
    expect(docs[0].id).toBe(docId);
  });
});