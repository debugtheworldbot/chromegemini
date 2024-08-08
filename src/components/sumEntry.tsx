"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function SumEntry() {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/summarization") return null;
  return (
    <button onClick={() => router.push("/summarization")} className="relative">
      Summarize with ChromeAI
      <span className="absolute left-0 -top-4 text-xs font-bold bg-yellow-400 text-black px-1 rounded">
        NEW
      </span>
    </button>
  );
}
