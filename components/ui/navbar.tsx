"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@primer/octicons-react";

interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  logo: {
    src: string;
    alt: string;
  };
  items: NavItem[];
  className?: string;
}

export function Navbar({ logo, items, className }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <nav
      className={cn(
        "h-16 px-4 border-b",
        "bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-border)]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src={logo.src} alt={logo.alt} className="h-8" />
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] flex items-center gap-1"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md hover:bg-[var(--color-surface)] focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          {/* User */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
