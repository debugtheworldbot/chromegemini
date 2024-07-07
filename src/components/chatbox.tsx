"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Chat, currentChatAtom, historyAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { useCheckAI } from "@/hooks/use-check-ai";
import {
  CircleX,
  Languages,
  Loader,
  MailPlus,
  SquarePen,
  StepForward,
} from "lucide-react";
import { ErrorModal } from "./errorModal";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { LanguageBox } from "./languageBox";
import { Close } from "@radix-ui/react-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";

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
  const [lang, setLang] = useState("");

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
              className="p-4 overflow-y-auto flex-1 md:min-w-[800px]"
            >
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
          ) : (
            <div className="flex-1 flex gap-4 justify-center items-center md:min-w-[800px]">
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2">
                    Translate language
                    <Languages />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                  <LanguageBox onChange={(lang) => setLang(lang)} />
                  <Button
                    onClick={() => {
                      setInputValue(`translate to ${lang}: \n`);
                    }}
                    variant="outline"
                    size="icon"
                  >
                    <StepForward />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
          <footer className="sticky bottom-0 pb-4 rounded bg-white/50 backdrop-blur pt-2">
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
                chatHistory.push(res);
                const aiReplayStream = await model?.promptStreaming(inputValue);
                setInputValue("");
                setChatHistory(chatHistory);
                for await (const chunk of aiReplayStream) {
                  setChatHistory((h) => {
                    h[h.length - 1].text = chunk;
                    return [...h];
                  });
                }
              }}
              onReset={onReset}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="reset"
                      className="p-2"
                      disabled={!isAI}
                      variant="outline"
                    >
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
                  disabled={!isAI}
                />
                <Button
                  className="absolute right-2 bottom-2"
                  type="submit"
                  size="sm"
                  disabled={!isAI}
                >
                  Send
                </Button>
              </div>
            </form>

            <p className="text-center mt-2 text-zinc-600 font-medium mx-2">
              Compare the results among ChromeAI, ChatGPT, Claude, and Llama in{" "}
              <Link
                className="underline"
                href="https://chathub.gg/?via=ChromeAIorg"
                target="_blank"
              >
                ChatHub
              </Link>
              .
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
