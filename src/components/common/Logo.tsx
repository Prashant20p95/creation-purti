import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  isLink?: boolean;
}

/**
 * Official Purti Creations Brand Wordmark
 * NON-NEGOTIABLE BRANDING RULE:
 * Must contain ONLY "Purti Creations".
 * No subtitle, tagline, slogan, or extra descriptive text may appear inside the logo.
 */
export function Logo({ className = "", isLink = true }: LogoProps) {
  const content = (
    <span
      className={`font-serif font-bold text-burgundy-950 tracking-tight text-xl sm:text-2xl select-none transition-colors hover:text-burgundy-800 ${className}`}
    >
      Purti Creations
    </span>
  );

  if (isLink) {
    return (
      <Link href="/" className="inline-flex items-center" aria-label="Purti Creations Home">
        {content}
      </Link>
    );
  }

  return content;
}
