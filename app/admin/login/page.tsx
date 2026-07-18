"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth/login";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <main className="flex h-screen items-center justify-center bg-true-black px-4">
      <form action={formAction} className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-gs-800 p-8">
        <div>
          <h1 className="text-lg font-medium text-off-white">The Thirteen</h1>
          <p className="text-sm text-gs-500">Admin access</p>
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          className="rounded-lg border border-gs-800 bg-night-black px-4 py-3 text-sm text-off-white outline-none focus:border-gs-600"
        />

        {state?.error && <p className="text-xs text-red-400">{state.error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer rounded-full bg-off-white py-3 text-sm font-medium text-true-black transition-colors hover:bg-gs-100 disabled:opacity-50"
        >
          {isPending ? "Entering..." : "Enter"}
        </button>
      </form>
    </main>
  );
}