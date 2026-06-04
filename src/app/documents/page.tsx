"use client";

import { useEffect, useState, useCallback } from "react";

type Doc = {
  id: number;
  title: string;
};

export default function DocumentsPage() {
  const [owned, setOwned] = useState<Doc[]>([]);
  const [shared, setShared] = useState<Doc[]>([]);

  const [uploading, setUploading] = useState(false);

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId")
      : null;

  const load = useCallback(async () => {
    const res = await fetch(`/api/documents?userId=${userId}`);
    const data = await res.json();

    setOwned(data.owned);
    setShared(data.shared);
  }, [userId]);

  async function createDoc() {
    await fetch(`/api/documents?userId=${userId}`, {
      method: "POST",
      body: JSON.stringify({ title: "Untitled" }),
    });

    load();
  }

  async function uploadFile(file: File) {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/upload", {
      method: "POST",
      headers: {
        "x-user-id": localStorage.getItem("userId") || "1",
      },
      body: formData,
    });

    setUploading(false);
    load(); // refresh document list
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (userId) load();
  }, [load, userId]);

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">
        Documents
      </h1>

      <button
        className="border px-3 py-1"
        onClick={createDoc}
      >
        + New Document
      </button>

      <div className="flex gap-2 items-center">
        <input
          type="file"
          accept=".txt,.md"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
          }}
        />

        {uploading && (
          <span className="text-sm">
            Uploading...
          </span>
        )}
      </div>

      <div>
        <h2 className="font-semibold">
          Owned
        </h2>

        {owned.map((d) => (
          <a key={d.id + '-owned'} href={`/documents/${d.id}`}>
            {d.title}
          </a>
        ))}
      </div>

      <div>
        <h2 className="font-semibold">
          Shared With Me
        </h2>

        {shared.map((d) => (
          <>
            <a key={d.id + '-shared'} href={`/documents/${d.id}`}>
              {d.title}
            </a>

            <span className="text-xs text-gray-500">
              shared
            </span>
          </>
        ))}
      </div>
    </div>
  );
}