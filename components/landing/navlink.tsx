"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className" | "href"> {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, href, ...props }, ref) => {
    const pathname = usePathname();

    const isActive = pathname === href;

    // Next.js doesn’t expose "pending" like react-router
    const isPending = false;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          className,
          isActive && activeClassName,
          isPending && pendingClassName
        )}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };