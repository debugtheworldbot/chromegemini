"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { sideTriggerAtom } from "@/lib/store";
import { CircleChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SideTrigger() {
  const [visible, setVisible] = useAtom(sideTriggerAtom);
  return (
    <Button
      onClick={() => setVisible((v) => !v)}
      className="fixed top-5 left-2 z-10 sm:block hidden bg-white/70 backdrop-blur"
      variant="ghost"
    >
      <CircleChevronLeft
        className={cn(visible ? "rotate-0" : "rotate-180", "transition-all")}
      />
    </Button>
  );
}
