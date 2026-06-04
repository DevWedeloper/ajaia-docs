"use client";

export default function Home() {

  function login(id: string) {
    localStorage.setItem("userId", id);
    window.location.href = "/documents";
  }

  return (
    <div className="p-10">
      <h1>Login</h1>

      <button
        onClick={() => login("1")}
      >
        Alice
      </button>

      <button
        onClick={() => login("2")}
      >
        Bob
      </button>
    </div>
  );
}