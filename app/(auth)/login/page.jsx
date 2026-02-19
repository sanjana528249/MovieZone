import Link from "next/link";
import AuthForm from "@/components/ui/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 pt-10">
      <div className="glass-panel rounded-3xl max-w-md w-full p-8">
        <h1 className="text-2xl font-bold mb-6">Welcome back</h1>
        <AuthForm mode="login" />
        <p className="mt-4 text-xs text-slate-400">
          New to MovieZone?{" "}
          <Link href="/signup" className="text-primary-soft hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

