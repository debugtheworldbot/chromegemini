import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Link } from "next-view-transitions";
import InstantDialog from "./instantDialog";
import { Chrome, Github, CircleHelp, BookOpenText } from "lucide-react";
import Image from "next/image";
import { SettingsDialog } from "./settingsDialog";
import SumEntry from "./sumEntry";

export default function Header() {
  return (
    <header className="sticky px-4 py-2 top-0 bg-white/50 backdrop-blur flex justify-between flex-col sm:flex-row gap-2">
      <Link href="/" className="min-w-0 md:ml-16">
        <Image
          src="/logo.png"
          width={24}
          height={24}
          alt=""
          className="absolute opacity-0 pointer-events-none"
        />
        <h1 className="font-cal text-3xl flex gap-4">
          ChromeAI.org
          <Badge className="leading-5 self-center">Gemini Nano</Badge>
        </h1>
        <p className="flex items-center">
          <span className="text-muted-foreground">
            Chrome AI Test Page, running Gemini Nano locally in your browser.
          </span>
        </p>
      </Link>
      <div className="flex flex-wrap md:gap-4 gap-2 items-center">
        <SumEntry />
        <InstantDialog />
        <SettingsDialog />
        <Link href="/blog">
          <Button size="icon" variant="ghost">
            <BookOpenText />
          </Button>
        </Link>
        <Link
          href="https://github.com/debugtheworldbot/chromegemini"
          target="_blank"
        >
          <Button size="icon" variant="ghost">
            <Github />
          </Button>
        </Link>
      </div>
    </header>
  );
}
