"use client";

import { useEffect, useState, use } from "react";
import { useRef } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const USERS = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

export default function DocumentEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [title, setTitle] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [shareUserId, setShareUserId] = useState("2");

  // ✅ FIX: always hold latest title
  const titleRef = useRef(title);

  useEffect(() => {
    titleRef.current = title;
  }, [title]);

  async function shareDoc() {
    await fetch("/api/share", {
      method: "POST",
      body: JSON.stringify({
        documentId: Number(id),
        userId: Number(shareUserId),
      }),
    });

    alert("Shared!");
  }

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
    immediatelyRender: true,
  });

  // 1. Load document
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/documents/${id}`);
      const data = await res.json();

      setTitle(data.title ?? "");

      if (editor && data.content) {
        try {
          editor.commands.setContent(JSON.parse(data.content));
        } catch (err) {
          console.error("Invalid content JSON", err);
        }
      }

      setLoaded(true);
    }

    load();
  }, [editor, id]);

  // 2. Autosave (FIXED)
  useEffect(() => {
    if (!editor || !loaded) return;

    const interval = setInterval(async () => {
      await fetch(`/api/documents/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: titleRef.current, // ✅ always latest
          content: JSON.stringify(editor.getJSON()),
        }),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [editor, loaded, id]);

  if (!editor) return null;
  if (!loaded) return <div>Loading...</div>;

  return (
    <>
      {/* Share bar */}
      <div className="flex gap-2 items-center border p-2">
        <select
          value={shareUserId}
          onChange={(e) => setShareUserId(e.target.value)}
        >
          {USERS.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <button onClick={shareDoc} className="border px-3 py-1">
          Share
        </button>
      </div>

      <div className="p-10 space-y-4">
        {/* Title */}
        <input
          className="text-2xl font-bold border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Toolbar */}
        <div className="flex gap-2 border p-2">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            Bold
          </button>

          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Italic
          </button>

          <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
            Underline
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            • List
          </button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            1. List
          </button>
        </div>

        {/* Editor */}
        <div className="border p-4 min-h-100">
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
}