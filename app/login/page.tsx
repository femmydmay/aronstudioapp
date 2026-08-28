"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import aronLogo from "@/assets/aron-logo.png";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

type Role = "admin" | "customer" | null;

interface UserDoc {
  role?: Role;
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setErrors({});

      // ✅ Sign in
      const cred = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      // ✅ Fetch user role from Firestore
      const snap = await getDoc(doc(db, "users", cred.user.uid));

      let role: Role = null;

      if (snap.exists()) {
        const data = snap.data() as UserDoc;
        role = data.role ?? null;
      }

      // ✅ Save auth cookie (basic placeholder)
      document.cookie = "token=loggedin; path=/";

      // ✅ Redirect (cleaned)
      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else if (role === "customer") {
        router.replace("/customer/dashboard");
      } else {
        router.replace("/");
      }
    } catch (error: any) {
      console.error(error);

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        setErrors({ form: "Invalid email or password" });
      } else {
        setErrors({ form: "Something went wrong. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-white/50 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            {/* <Music className="w-6 h-6 text-primary fill-primary" /> */}
            <Image
              src={aronLogo}
              alt="Aron Studios"
              width={0}
              height={0}
              className="h-10 w-auto"
              priority
              loading="eager"
            />
            <span className="font-bold text-white">Aron Studios</span>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="w-7 h-9" />
            ) : (
              <Moon className="w-7 h-9" />
            )}
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-border shadow-lg">
          <div className="p-8">
            {/* Back Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            <h1 className="text-3xl font-bold text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mb-8">
              Sign in to your Aron Studios account
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errors.form}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Your password"
                  className={errors.password ? "border-red-500" : ""}
                  disabled={isLoading}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white h-10 mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Signup Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Create one here
              </Link>
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
