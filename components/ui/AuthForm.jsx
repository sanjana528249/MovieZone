"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }) {
  const isLogin = mode === "login";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Request failed");
      }

      router.push("/browse");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-500/60 bg-red-500/10 px-4 py-2 text-xs text-red-200">
          {error}
        </div>
      )}

      {!isLogin && (
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-900/70 border border-slate-700/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/70"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-xl bg-slate-900/70 border border-slate-700/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/70"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
        <input
          type="password"
          name="password"
          required
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-xl bg-slate-900/70 border border-slate-700/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/70"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center mt-2"
      >
        {loading
          ? isLogin
            ? "Logging in..."
            : "Signing up..."
          : isLogin
          ? "Login"
          : "Sign up"}
      </button>
    </form>
  );
}
