import { Chat, currentChatAtom, historyAtom } from "@/lib/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Textarea } from "./ui/textarea";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";
import { useCheckAI } from "@/hooks/use-check-ai";

export default function InputBar({
  preset,
  onClear,
}: {
  preset: string;
  onClear: () => void;
}) {
  const { model, updateModel } = useCheckAI();
  const [chatHistory, setChatHistory] = useAtom(currentChatAtom);
  const [inputValue, setInputValue] = useState("");
  const [fullHistory, saveChatHistory] = useAtom(historyAtom);
  const submitRef = useRef<HTMLButtonElement>(null);
  const lastMsgRef = useRef<HTMLSpanElement>(null);
  const isComposing = useRef(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setInputValue(preset);
  }, [preset]);

  const onReset = async () => {
    onClear();
    if (
      chatHistory.length &&
      !fullHistory.find(
        (h) => h.id === chatHistory[chatHistory.length - 1].createdAt,
      )
    ) {
      saveChatHistory((h) => [
        ...h,
        {
          id: chatHistory[chatHistory.length - 1].createdAt,
          chatHistory: chatHistory,
        },
      ]);
    }
    setChatHistory([]);
    setInputValue("");
    await updateModel();
    setErr("");
  };

  return (
    <footer className="sticky bottom-0 pb-4 sm:pb-8 rounded bg-white pt-2">
      {err && (
        <p className="text-center">
          <span className="text-red-500">Error: {err}</span>
          Maybe create a new chat?
        </p>
      )}
      <form
        className="flex w-full items-center gap-4 px-2 mt-auto"
        onSubmit={async (form) => {
          try {
            setErr("");
            form.preventDefault();
            if (inputValue === "") {
              return;
            }
            const id = chatHistory.length + 1;
            const input: Chat = {
              id,
              role: "user",
              text: inputValue,
              createdAt: new Date().toISOString(),
            };
            const res: Chat = {
              id: id + 1,
              role: "assistant",
              text: "",
              createdAt: new Date().toISOString(),
            };

            setChatHistory((h) => [...h, input, res]);
            const aiReplayStream = await model?.promptStreaming(inputValue);
            setInputValue("");
            for await (const chunk of aiReplayStream) {
              setChatHistory((h) => {
                h[h.length - 1].text += chunk;
                return [...h];
              });
              lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
            }
            setErr("");
          } catch (e: any) {
            const msg = e.message;
            console.log(typeof e, msg);
            setErr(msg);
          }
        }}
        onReset={onReset}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="reset" className="p-2" variant="outline">
                <SquarePen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="w-full relative">
          <Textarea
            placeholder="Chat to Chrome on-device AI locally, no internet connected."
            name="text"
            className="w-full pr-20"
            value={inputValue}
            onInput={(e) => {
              if ("value" in e.target) {
                setInputValue(e.target.value as string);
              }
            }}
            onCompositionStart={() => {
              isComposing.current = true;
            }}
            onCompositionEnd={() => {
              isComposing.current = false;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isComposing.current) {
                e.preventDefault();
                submitRef.current?.click();
              }
            }}
          />
          <Button
            className="absolute right-2 bottom-2"
            type="submit"
            size="sm"
            ref={submitRef}
          >
            Send
          </Button>
        </div>
      </form>
    </footer>
  );
}
