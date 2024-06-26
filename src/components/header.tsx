import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import InstantDialog from "./instantDialog";
import { Github } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky p-4 top-0 bg-white/50 backdrop-blur flex justify-between flex-col sm:flex-row gap-2">
      <div className="flex min-w-0 flex-col gap-1 sm:ml-16">
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
      <div className="flex gap-4 items-center">
        <InstantDialog />
        <Button variant="secondary" className="my-auto rounded-full">
          <Link href="/help">HELP</Link>
        </Button>
        <Link
          href="https://github.com/debugtheworldbot/chromegemini"
          target="_blank"
        >
          <Github />
        </Link>
      </div>
    </header>
  );
}
