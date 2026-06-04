# Submission Checklist — Ajaia Collaborative Docs

This document lists all deliverables included in the submission and provides quick verification steps for reviewers.

---

## Live Deployment

- [ ] Live application URL is accessible  
- [ ] App loads without setup  
- [ ] Login screen works (Alice / Bob)  
- [ ] No environment configuration required for reviewers  

---

## Repository Contents

- [ ] Full source code included  
- [ ] Next.js project structure intact  
- [ ] Drizzle schema included  
- [ ] API routes functional  
- [ ] UI pages complete  
- [ ] README.md included  
- [ ] ARCHITECTURE.md included  
- [ ] AI_WORKFLOW.md included  

---

## Core Features Verification

### 1. Document Creation & Editing

- [ ] User can create a new document  
- [ ] User can rename document  
- [ ] Rich text editor works (bold, italic, underline, lists)  
- [ ] Autosave persists changes  
- [ ] Document reload restores content correctly  

---

### 2. File Upload

- [ ] .txt file upload works  
- [ ] .md file upload works  
- [ ] Uploaded file becomes a new document  
- [ ] File content is editable in editor  

---

### 3. Sharing System

- [ ] Alice can share document with Bob  
- [ ] Share entry is created successfully  
- [ ] Bob sees shared document in “Shared With Me”  
- [ ] Shared document opens correctly in editor  

---

### 4. Persistence

- [ ] Documents persist after refresh  
- [ ] Editor content is stored in database  
- [ ] Sharing relationships persist correctly  

---

## Testing

- [ ] Automated test suite runs successfully  
- [ ] Sharing logic test passes  
- [ ] Database operations validated via tests  

Run:

npm run test

---

## Setup Instructions (for local run)

Run:

npm install  
npm run dev  

If using Turso:

Ensure .env.local contains:
- DATABASE_URL  
- DATABASE_AUTH_TOKEN  

---

## Known Limitations

- No real authentication system (simulated login only)  
- No real-time collaboration  
- No conflict resolution for simultaneous edits  
- Basic sharing model (no roles or permissions hierarchy)  
- Limited file types supported (.txt, .md only)  

---

## Scope Decisions

To prioritize a complete working system within the timebox, the following were intentionally excluded:

- WebSocket-based real-time editing  
- Version history  
- Comments or suggestions mode  
- Advanced permission system (RBAC)  
- Offline support  

---

## AI Usage Summary

AI tools were used for:

- scaffolding backend routes  
- schema design support  
- editor integration guidance  
- test structure generation  

All final implementation decisions were validated and adjusted manually.

---

## Reviewer Quick Start

To evaluate quickly:

- Open live URL  
- Login as Alice  
- Create a document  
- Edit content in editor  
- Share document with Bob  
- Login as Bob  
- Verify shared document appears  
- Upload a .txt file  
- Confirm persistence after refresh  

---

## Expected Review Time

Estimated: 5–10 minutes for full evaluation  

---

## Notes

This project prioritizes:

- working end-to-end functionality  
- clear product flow  
- minimal setup friction  
- understandable architecture under time constraints  