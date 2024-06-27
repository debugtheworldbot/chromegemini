import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="font-cal text-3xl flex gap-4">
          ChromeAI.org
          <Badge className="leading-5 self-center">Gemini Nano</Badge>
        </h1>
        <div className="flex gap-4">
          <span className="text-muted-foreground">
            Chrome AI Test Page, running Gemini Nano locally in your browser.
          </span>
        </div>
      </div>
      <Button variant="secondary" className="my-auto rounded-full">
        <Link href="/help">HELP & INTRODUCTION</Link>
      </Button>
    </div>
  );
}
