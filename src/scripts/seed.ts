import { db } from "../db/db";
import { users } from "../db/schema";

await db.insert(users).values([
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
  },
]).run();