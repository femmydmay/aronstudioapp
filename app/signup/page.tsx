"use client";

import React from "react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import aronLogo from "@/assets/aron-logo.png";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

type Role = "customer";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as Role) || "customer";

  const [role, setRole] = useState<Role>(initialRole);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

      let cred;

      try {
        cred = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );
      } catch (err: any) {
        if (err.code === "auth/email-already-in-use") {
          cred = await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password,
          );
        } else {
          throw err;
        }
      }

      await setDoc(
        doc(db, "users", cred.user.uid),
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: role,
          updatedAt: new Date(),
        },
        { merge: true },
      );

      // Redirect (only customer exists)
      router.replace("/customer/dashboard");
    } catch (error: any) {
      console.error(error);
      setErrors({ email: "Something went wrong. Try again." });
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
              Create Account
            </h1>
            <p className="text-muted-foreground mb-8">Book a session today</p>

            {/* Role Selection (Single Customer Only) */}
            <div className="mb-8">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`p-4 rounded-lg border-2 transition text-center w-full ${
                  role === "customer"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-white hover:border-primary/50"
                }`}
              >
                <div className="font-semibold text-sm text-primary">
                  I Need a session
                </div>
                <div className="text-xs text-muted-foreground mt-1">Client</div>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name
                </label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                  className={errors.firstName ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name
                </label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Your last name"
                  className={errors.lastName ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

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
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="At least 8 characters"
                  className={errors.password ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white h-10 mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
