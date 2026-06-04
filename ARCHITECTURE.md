# Architecture Note — Ajaia Collaborative Docs

## Overview

This project is a lightweight collaborative document editor built as a full-stack Next.js application. The architecture prioritizes simplicity, fast iteration, and end-to-end product completeness within a strict timebox.

The system is intentionally monolithic to reduce operational complexity while maintaining clear separation between UI, API logic, and persistence.

---

## High-Level Architecture

The application follows a simple layered structure:

### 1. Frontend (Next.js App Router)

- Page-based routing ("/documents", "/documents/[id]")
- Client-side state for editor and UI interactions
- Tiptap for rich text editing

### 2. Backend (Next.js API Routes)

- REST-style endpoints inside "/app/api"
- Handles document CRUD operations
- Handles sharing logic
- Handles file upload processing

### 3. Database Layer

- SQLite/libSQL (via Drizzle ORM)
- Hosted via Turso in production
- Schema-driven design with explicit tables:
  - users
  - documents
  - shares

---

## Data Model Design

### Documents

Stores core content and metadata:

- title
- content (Tiptap JSON)
- ownerId
- timestamps

### Shares

Represents access control:

- documentId
- userId

This enables a simple many-to-many access model without introducing complex RBAC systems.

### Users

Seeded users used for simplified authentication simulation.

---

## Key Design Decisions

### 1. Monolithic Full-Stack Structure

The backend is embedded within the Next.js app to reduce deployment complexity and improve iteration speed.

### 2. SQLite/libSQL + Drizzle

SQLite/libSQL was chosen for simplicity and portability. Drizzle provides type-safe queries without heavy ORM overhead.

Turso was used in production to ensure persistence across deployments.

### 3. JSON-Based Rich Text Storage

Tiptap editor state is stored as JSON instead of HTML to preserve structure and enable future extensibility.

### 4. Lightweight Sharing Model

Sharing is implemented as a simple join table rather than a permissions engine. This was a deliberate scope decision to ensure correctness and reliability within the timebox.

---

## Data Flow

### Document Editing Flow

1. User opens document page
2. API fetches document by ID
3. Tiptap loads JSON content
4. User edits content
5. Autosave periodically persists updates

---

### Sharing Flow

1. Owner selects user to share with
2. Share record is created in "shares" table
3. Recipient fetches shared documents via join query
4. Document appears in “Shared With Me” section

---

### File Upload Flow

1. User uploads ".txt" or ".md"
2. Server reads raw file content
3. Content is converted into Tiptap-compatible JSON
4. New document is created and stored

---

## Performance Considerations

Given the scope, performance optimizations were minimal but sufficient:

- Simple indexed queries via primary keys
- No unnecessary joins beyond sharing lookup
- Client-side state kept minimal
- Autosave interval balanced for usability vs API load

---

## Scalability Notes

This architecture could be extended toward production systems by:

- Replacing SQLite/libSQL with Postgres at scale
- Adding authentication (Auth.js or Clerk)
- Introducing WebSockets for real-time collaboration
- Adding optimistic concurrency control for edits
- Introducing document version history

---

## Tradeoffs

### Chosen Tradeoffs

- Simplicity over extensibility
- Embedded backend over microservices
- Basic sharing over full permission system
- No real-time sync

### Reason

The goal of this project was to demonstrate a complete, working product slice rather than a fully generalized collaboration platform.

---

## Summary

The system is optimized for:

- Fast development
- Clear product behavior
- Easy review and evaluation
- Reliable core functionality within time constraints