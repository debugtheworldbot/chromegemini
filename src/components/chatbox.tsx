"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChatHistory, currentChatAtom, historyAtom } from "@/lib/store";
import { useAtom } from "jotai";

declare global {
  interface Window {
    ai: any;
  }
}

const checkAI = async () => {
  if ("ai" in window) {
    if ((await window.ai.canCreateTextSession()) === "readily") {
      return true;
    }
  }
  return false;
};

export default function ChatBox() {
  const [fullHistory, saveChatHistory] = useAtom(historyAtom);
  const [endMessage, setEndMessage] = useState<null | HTMLDivElement>(null);
  const [model, setModel] = useState<{ prompt: any; promptStreaming: any }>();
  const [isAI, setIsAI] = useState<null | boolean>(null);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useAtom(currentChatAtom);

  const updateIsAI = async () => {
    const checkAIStatus = await checkAI();

    if (checkAIStatus) {
      const thisModel = await window.ai.createTextSession();
      setModel(thisModel);
    }

    setIsAI(checkAIStatus);
  };

  useEffect(() => {
    updateIsAI();
  }, []);

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
    <>
      <div>{isAI === null && <p>Checking your browser</p>}</div>

      <div className="w-full flex-1 flex flex-col">
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
                    <p>loading...</p>
                  )}
                </div>
              );
            }
          })}
        </div>
        <form
          className="flex w-full items-center space-x-2 mt-auto"
          onSubmit={async (form) => {
            form.preventDefault();
            if (inputValue === "") {
              return;
            }
            const id = chatHistory.length + 1;
            const input: ChatHistory = {
              id,
              role: "user",
              text: inputValue,
              createdAt: new Date().toISOString(),
            };
            const res: ChatHistory = {
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
              res.text = chunk;
              setChatHistory((h) => {
                h[h.length - 1].text = chunk;
                console.log(chunk);
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
            placeholder="Type here"
            name="text"
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
        <div className="mt-4 text-gray-400 text-center">
          {isAI !== null &&
            (isAI ? (
              <p className="text-sm font-medium leading-none">
                ✅ Your chrome support Built-in AI. Your messages stay on your
                computer, everything is kept private and local.
              </p>
            ) : (
              <p>
                ❌ Oops! Local AI isn&#39;t working right now. Check out our
                <a
                  href="https://github.com/debugtheworldbot/chromegemini?tab=readme-ov-file#how-to-set-up-built-in-gemini-nano-in-chrome"
                  className="font-medium text-primary underline underline-offset-4 mx-2"
                >
                  quick setup guide
                </a>
                to get it running
              </p>
            ))}
        </div>
      </div>
    </>
  );
}
