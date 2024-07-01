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
import { useCheckAI } from "@/hooks/use-check-ai";
import { Loader } from "lucide-react";

export default function InstantDialog() {
  const [output, setOutput] = useState("");
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAI, model } = useCheckAI();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!isAI}>Instant Mode</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instant Mode</DialogTitle>
          <DialogDescription>
            In this mode, your input is submitting to gemini nano in real time.
          </DialogDescription>
        </DialogHeader>

        {/* <Tabs defaultValue="normal" className="w-[400px]"> */}
        {/*   <TabsList> */}
        {/*     <TabsTrigger value="normal">Normal</TabsTrigger> */}
        {/*     <TabsTrigger value="translate">Translate</TabsTrigger> */}
        {/*   </TabsList> */}
        {/* </Tabs> */}

        <Input
          onInput={async (e) => {
            const prompt = e.currentTarget.value;
            const startTime = performance.now();
            setLoading(true);
            const res = await model?.prompt(prompt);
            setLoading(false);
            setTime(performance.now() - startTime);
            setOutput(res);
          }}
        />

        {loading && <Loader className="animate-spin" />}
        {output && (
          <>
            <header className="text-lg font-bold">
              output:
              {time > 0 && (
                <span
                  className={cn(
                    time > 5000
                      ? "text-red-500"
                      : time > 1000
                        ? "text-yellow-400"
                        : "text-green-500",
                    "ml-2",
                  )}
                >
                  {time.toFixed(0)} ms
                </span>
              )}
            </header>
            <article className="prose rounded bg-slate-200 p-2 max-h-80 overflow-scroll">
              <Markdown>{output}</Markdown>
            </article>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
