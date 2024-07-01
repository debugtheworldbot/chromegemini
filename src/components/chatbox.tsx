"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Chat, currentChatAtom, historyAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { useCheckAI } from "@/hooks/use-check-ai";
import { Loader } from "lucide-react";
import { Modal } from "./modal";

declare global {
  interface Window {
    ai: any;
  }
}

export default function ChatBox() {
  const [fullHistory, saveChatHistory] = useAtom(historyAtom);
  const [endMessage, setEndMessage] = useState<null | HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useAtom(currentChatAtom);

  const { isAI, model, error } = useCheckAI();

  useEffect(() => {
    endMessage?.scrollIntoView({ behavior: "smooth" });
  }, [endMessage]);

  const onReset = () => {
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
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      {error && <Modal error={error} />}
      {!isAI ? (
        <div className="text-center my-auto">
          {isAI === null && (
            <p className="text-2xl font-medium flex items-center mb-16">
              <Loader className="animate-spin mr-2" /> Checking your browser...
            </p>
          )}
        </div>
      ) : (
        <>
          <div id="chatbox" className="p-4 overflow-y-auto flex-1">
            {chatHistory.map((chat) => {
              if (chat.role === "user") {
                return (
                  <div className="mb-2 text-right" key={chat.id}>
                    <div className="prose bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                      <Markdown>{chat.text}</Markdown>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="mb-2"
                    key={chat.id}
                    ref={(el) => {
                      setEndMessage(el);
                    }}
                  >
                    {chat.text ? (
                      <div className="prose bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        <Markdown>{chat.text}</Markdown>
                      </div>
                    ) : (
                      <Loader className="animate-spin" />
                    )}
                  </div>
                );
              }
            })}
          </div>
          <footer className="sticky bottom-0 rounded bg-white/50 backdrop-blur pt-2">
            <form
              className="flex w-full items-center gap-4 px-2 mt-auto"
              onSubmit={async (form) => {
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

                chatHistory.push(input);
                const prompt = `${chatHistory.map((chat) => {
                  return `${chat.role}: ${chat.text}\n`;
                })}\nassistant:`;
                chatHistory.push(res);
                console.log("submit", prompt);
                const aiReplayStream = await model?.promptStreaming(prompt);
                setInputValue("");
                setChatHistory(chatHistory);
                for await (const chunk of aiReplayStream) {
                  console.log(chunk);
                  setChatHistory((h) => {
                    h[h.length - 1].text = chunk;
                    return [...h];
                  });
                }
              }}
              onReset={onReset}
            >
              <Button type="reset" disabled={!isAI}>
                New Chat
              </Button>
              <Input
                placeholder="Chat to Chrome on-device AI locally, no internet connected."
                name="text"
                className="w-full"
                value={inputValue}
                onInput={(e) => {
                  if ("value" in e.target) {
                    setInputValue(e.target.value as string);
                  }
                }}
                disabled={!isAI}
              />
              <Button type="submit" disabled={!isAI}>
                Send
              </Button>
            </form>
            <div className="my-4 text-gray-400 text-center">
              <p className="text-sm font-medium leading-none">
                ✅ Your chrome support Built-in AI. Your messages stay on your
                computer, everything is kept private and local.
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
