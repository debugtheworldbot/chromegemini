"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { currentChatAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { useCheckAI } from "@/hooks/use-check-ai";
import { Loader } from "lucide-react";
import { ErrorModal } from "./errorModal";
import Image from "next/image";
import InputBar from "./inputBar";
import Presets from "./presets";
import Link from "next/link";

declare global {
  interface Window {
    ai: any;
  }
}

export default function ChatBox() {
  const [chatHistory] = useAtom(currentChatAtom);
  const lastMsgRef = useRef<HTMLSpanElement>(null);
  const [preset, setPreset] = useState("");

  const { isAI, model, error } = useCheckAI();

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isAI]);

  const hasLastRes =
    chatHistory[chatHistory.length - 1] &&
    chatHistory[chatHistory.length - 1]?.role === "assistant" &&
    !!chatHistory[chatHistory.length - 1]?.text;
  return (
    <div className="w-full flex-1 flex flex-col">
      <ErrorModal error={error} />
      {!isAI ? (
        <div className="text-center my-auto">
          {isAI === null && (
            <p className="text-2xl font-medium flex items-center mb-16">
              <Loader className="animate-spin mr-2" /> Checking your browser...
            </p>
          )}
          {isAI === false && (
            <div className="text-lg font-medium mx-4">
              Your browser is not supported.
              <br />
              Check out our
              <ErrorModal
                error={error}
                trigger={
                  <p className="font-medium text-primary underline underline-offset-4 mx-2">
                    quick setup guide
                  </p>
                }
              />
              to get it running!
            </div>
          )}
        </div>
      ) : (
        <>
          {chatHistory.length > 0 ? (
            <div
              id="chatbox"
              className="p-4 overflow-y-auto flex-1 md:w-[800px]"
            >
              {chatHistory.map((chat) => {
                if (chat.role === "user") {
                  return (
                    <div className="mb-4 text-right" key={chat.id}>
                      <div className="prose bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                        <Markdown>{chat.text}</Markdown>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="mb-4 flex gap-4 py-2" key={chat.id}>
                      <Image
                        src="/gemini.svg"
                        className="self-start"
                        width={30}
                        height={30}
                        alt="gemini icon"
                      />
                      {chat.text ? (
                        <div className="prose inline-block">
                          <Markdown>{chat.text}</Markdown>
                        </div>
                      ) : (
                        <Loader size={30} className="animate-spin" />
                      )}
                    </div>
                  );
                }
              })}
              {hasLastRes && (
                <Link
                  className="text-gray-700 rounded-lg bg-slate-100 px-4 py-2 ml-12 -mt-2 inline-flex"
                  href="https://app.chathub.gg/?via=ChromeAIorg"
                  target="_blank"
                >
                  👉 Compare with ChatGPT at ChatHub
                </Link>
              )}
              <span ref={lastMsgRef} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-4 justify-center items-center md:w-[800px]">
              <h3>
                <p className="flex gap-4 mb-4 text-2xl font-medium">
                  <Image
                    src="/gemini.svg"
                    width={30}
                    height={30}
                    alt="gemini icon"
                  />
                  Gemini Nano
                </p>
              </h3>
              <Presets onSelect={(p) => setPreset(p)} />
            </div>
          )}
          <InputBar model={model} preset={preset} />
        </>
      )}
    </div>
  );
}
