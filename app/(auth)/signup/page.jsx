import Link from "next/link";
import AuthForm from "@/components/ui/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 pt-10">
      <div className="glass-panel rounded-3xl max-w-md w-full p-8">
        <h1 className="text-2xl font-bold mb-6">Create your account</h1>
        <AuthForm mode="signup" />
        <p className="mt-4 text-xs text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-soft hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

