# Ajaia Collaborative Docs

A lightweight collaborative document editor built for the Ajaia AI-Native Full Stack Developer Assignment.

This project demonstrates document creation, rich text editing, file import, and simple document sharing between users.

---

## Live Demo

URL:
https://ajaia-docs-alpha.vercel.app/

---

## Test Accounts

The app uses a simplified login system:

- Alice (owner)
- Bob (shared user)

You can switch users on the login screen.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Tiptap (rich text editor)
- Drizzle ORM
- SQLite/libSQL (via Turso in production)
- Vercel (deployment)

---

## Features

### 1. Document Creation & Editing

- Create new documents
- Rename documents
- Rich text editing using Tiptap:
  - Bold
  - Italic
  - Underline
  - Headings
  - Bullet lists
  - Numbered lists
- Autosave every few seconds
- Persistent storage

---

### 2. File Upload

- Upload ".txt" or ".md" files
- File content is converted into a new document
- Automatically opens in editor

---

### 3. Sharing System

- Simple user-based sharing model
- Owner can share documents with other users
- Shared documents appear under “Shared With Me”
- Access is controlled via a shares table

---

### 4. Persistence

- All documents stored in SQLite/libSQL (Turso in production)
- Content stored as Tiptap JSON
- Data persists across refreshes

---

## Architecture Overview

The system is intentionally simple:

- Frontend: Next.js App Router pages
- Backend: API routes inside Next.js
- Database: SQLite/libSQL via Drizzle ORM
- Editor state: Tiptap JSON

### Data Model

- users: seeded Alice and Bob
- documents: stores content and ownership
- shares: maps users to shared documents

---

## Setup Instructions

### 1. Install dependencies

```
pnpm install
```

---

### 2. Set environment variables

```
Create .env:

DATABASE_URL=your_turso_url  
DATABASE_AUTH_TOKEN=your_token
```

---

### 3. Run database migration

```
pnpm drizzle-kit push
```

---

### 4. Seed users (if needed)

```
pnpm run seed
```

---

### 5. Start dev server

```
pnpm run dev
```

---

## Testing

Run unit tests:

```
pnpm run test
```

Tests cover:

- document sharing creation
- shared document access logic

---

## AI Usage Notes

This project was built with assistance from AI tools for speed and scaffolding.

### Tools Used

- ChatGPT (architecture guidance, code scaffolding)
- AI-assisted code completion (optional IDE tools)

### Where AI Helped

- Drizzle schema design
- API route scaffolding
- Tiptap editor setup
- Test structure generation

### What Was Manually Adjusted

- Simplified sharing model (avoided over-engineered RBAC)
- Removed unnecessary backend complexity
- Ensured correct data flow between UI and DB

### How Correctness Was Verified

- Manual end-to-end testing of all flows
- Verified persistence across refresh
- Tested sharing between two users
- Automated test for sharing logic

---

## Architecture Decisions & Tradeoffs

### What was prioritized

- End-to-end functionality over feature completeness
- Simple sharing model over complex permissions
- Embedded API routes over separate backend service
- SQLite for speed and simplicity

### What was intentionally NOT built

- Real-time collaboration
- Version history
- Commenting system
- Advanced permissions (roles, teams)
- Conflict resolution

These were excluded to ensure a stable, complete core product within the timebox.

---

## Known Limitations

- No real authentication system (uses simulated login)
- Basic sharing model (no granular permissions)
- No real-time collaboration
- Minimal file type support

---

## Submission Contents

- Source code
- README
- Architecture note
- AI workflow note
- Automated test suite
- Live deployment link

---

## Summary

This project focuses on a clean, usable document workflow:

Create → Edit → Save → Share → Reopen

The goal was to prioritize correctness and product clarity within a limited timebox rather than full Google Docs parity.