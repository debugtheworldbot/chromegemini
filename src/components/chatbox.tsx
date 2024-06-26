"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";

import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
  const rawChatHistory = useRef<any[]>([]);
  const [endMessage, setEndMessage] = useState<null | HTMLDivElement>(null);
  const [model, setModel] = useState<{ prompt: any; promptStreaming: any }>();
  const [isAI, setIsAI] = useState<null | boolean>(null);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState(rawChatHistory.current);

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

  return (
    <>
      <div>
        {isAI === null && <p>Checking your browser</p>}
        {isAI !== null &&
          (isAI ? (
            <p className="text-sm font-medium leading-none">
              Your chrome support Built-in AI. All code runs
              <i className="font-bold"> locally </i>
              on your computer. No internet. No API calls.
            </p>
          ) : (
            <p>
              Built-in AI not work. Please check{" "}
              <a
                href="https://github.com/lightning-joyce/chromeai?tab=readme-ov-file#how-to-set-up-built-in-gemini-nano-in-chrome"
                className="font-medium text-primary underline underline-offset-4"
              >
                this steps
              </a>{" "}
              to turn on Built-in AI.
            </p>
          ))}
      </div>

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
            const id = rawChatHistory.current.length + 1;
            const input = {
              id,
              role: "user",
              text: inputValue,
            };
            const res = {
              id: id + 1,
              role: "assistant",
              text: "",
            };

            rawChatHistory.current.push(input);
            const prompt = `${rawChatHistory.current.map((chat) => {
              return `${chat.role}: ${chat.text}\n`;
            })}\nassistant:`;
            rawChatHistory.current.push(res);
            console.log("submit", prompt);
            const aiReplayStream = await model?.promptStreaming(prompt);
            setInputValue("");
            setChatHistory(rawChatHistory.current);
            for await (const chunk of aiReplayStream) {
              res.text = chunk;
              setChatHistory((h) => {
                h[h.length - 1].text = chunk;
                console.log(chunk);
                return [...h];
              });
            }
          }}
          onReset={() => {
            rawChatHistory.current = [];
            setChatHistory([]);
            setInputValue("");
          }}
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
      </div>
    </>
  );
}
