import {
  sqliteTable,
  integer,
  text
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const documents = sqliteTable("documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),

  content: text("content")
    .notNull()
    .$default(() => "{}"),

  ownerId: integer("owner_id").notNull(),

  createdAt: integer("created_at", {
    mode: "timestamp",
  }).$default(() => new Date()),

  updatedAt: integer("updated_at", {
    mode: "timestamp",
  }).$default(() => new Date()),
});

export const shares = sqliteTable("shares", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  documentId: integer("document_id").notNull(),

  userId: integer("user_id").notNull(),
});