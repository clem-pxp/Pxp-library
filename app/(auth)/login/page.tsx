"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/src/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Google } from "@/components/icons/Google";
import { ThreeDCube } from "@/components/icons/ThreeDCube";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    await signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    });

    if (result.error) {
      setError(result.error.message || "Une erreur est survenue");
      setIsLoading(false);
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-12 bg-fade-dark">
          <ThreeDCube className="size-8 text-light" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-semibold text-strong">Welcome back</h1>
          <p className="mt-1 text-sm text-soft">
            Sign in to access your component library
          </p>
        </div>
      </div>

      {/* Google OAuth */}
      <Button
        type="button"
        color="outline"
        size="large"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <Google className="size-4" />
        Continue with Google
      </Button>

      {/* Separator */}
      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-main px-2 text-xs text-soft">
          or
        </span>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          type="submit"
          size="large"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Info */}
      <p className="mt-6 text-center text-sm text-soft">
        Access is by invitation only
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
