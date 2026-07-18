import { logout } from "@/actions/auth/logout";

export default function AdminDashboard() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 bg-true-black">
      <p className="text-off-white">Dashboard (protegido) — em construção</p>
      <form action={logout}>
        <button type="submit" className="text-sm text-gs-500 underline">
          Log out
        </button>
      </form>
    </main>
  );
}
