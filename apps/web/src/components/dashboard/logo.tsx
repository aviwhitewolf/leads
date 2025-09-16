"use client";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState } = sidebar;
  return (
    <>
      <Link href="/dashboard" className="flex items-center gap-2 justify-center">
        
        <svg
          className="size-7 rotate-[25deg]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          strokeWidth={2}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 3v18" />
          <path d="M16 3v18" />
          <path d="M8 14h8" />
          <path d="M8 10h8" />
          <path d="M8 6h8" />
          <path d="M8 18h8" />
        </svg>
        <h1
          className={cn(
            "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
            !getOpenState()
              ? "-translate-x-96 opacity-0 hidden"
              : "translate-x-0 opacity-100"
          )}
        >
          <Image src="/logo-black.webp" alt="Logo" width={94} height={54} />
        </h1>
      </Link>
    </>
  );
};
