"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ClientAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      const isAdminRoute = pathname.startsWith("/admin");
      const isCustomerRoute = pathname.startsWith("/customer");

      const isProtectedRoute = isAdminRoute || isCustomerRoute;

      // ❌ Not logged in + trying to access protected area
      if (isProtectedRoute && !firebaseUser) {
        router.replace("/login");
      }
    });

    return () => unsub();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}