"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import Markdown from "react-markdown";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function InstantDialog() {
  const [output, setOutput] = useState("");
  const [time, setTime] = useState(0);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Instant Mode</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instant Mode</DialogTitle>
          <DialogDescription>
            In this mode, your input is submitting to gemini nano in real time.
          </DialogDescription>
        </DialogHeader>

        <Input
          onInput={async (e) => {
            const prompt = e.currentTarget.value;
            const model = await window.ai.createTextSession();
            const startTime = performance.now();
            const res = await model?.prompt(prompt);
            setTime(performance.now() - startTime);
            setOutput(res);
          }}
        />

        {time > 0 && (
          <p className={cn(time > 1000 ? "text-red-500" : "text-green-500")}>
            {time.toFixed(0)} ms
          </p>
        )}

        {output && (
          <>
            <header className="text-lg font-bold">output:</header>
            <article className="prose rounded bg-slate-200 p-2 max-h-80 overflow-scroll">
              <Markdown>{output}</Markdown>
            </article>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
