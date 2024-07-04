import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import InstantDialog from "./instantDialog";
import { Chrome, Github, CircleHelp } from "lucide-react";
import Image from "next/image";
import { SettingsDialog } from "./settingsDialog";

export default function Header() {
  return (
    <header className="sticky p-4 top-0 bg-white/50 backdrop-blur flex justify-between flex-col sm:flex-row gap-2">
      <div className="min-w-0 md:ml-16">
        <h1 className="font-cal text-3xl flex gap-4">
          ChromeAI.org
          <Badge className="leading-5 self-center">Gemini Nano</Badge>
        </h1>
        <p className="flex items-center">
          <span className="text-muted-foreground">
            Chrome AI Test Page, running Gemini Nano locally in your browser.
          </span>
        </p>
      </div>
      <div className="flex flex-wrap md:gap-4 gap-2 items-center">
        <InstantDialog />
        <Link
          className="hidden md:block"
          target="_blank"
          href="https://chromewebstore.google.com/detail/pienijlenieciiamahkllplgadmdibjm"
        >
          <Button className="flex gap-2" variant="outline">
            <Chrome />
            Extension
          </Button>
        </Link>
        <SettingsDialog />
        <Link href="/help">
          <Button size="icon" variant="ghost">
            <CircleHelp />
          </Button>
        </Link>
        <Link href="https://discord.gg/ZrF4kjUBhJ" target="_blank">
          <Button size="icon" variant="ghost">
            <Image src="/discord.svg" width={24} height={24} alt="" />
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
