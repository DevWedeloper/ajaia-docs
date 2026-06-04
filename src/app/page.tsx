"use client";

export default function Home() {

  function login(id: string) {
    localStorage.setItem("userId", id);
    window.location.href = "/documents";
  }

  return (
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-lg font-semibold border-b pb-2">
        Login
      </h1>

      <div className="flex flex-col gap-2 border p-4">
        <button
          onClick={() => login("1")}
          className="border p-2 text-left"
        >
          Alice
        </button>

        <button
          onClick={() => login("2")}
          className="border p-2 text-left"
        >
          Bob
        </button>
      </div>
    </div>
  );
}