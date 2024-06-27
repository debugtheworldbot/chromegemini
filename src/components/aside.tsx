"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import { ChatHistory, currentChatAtom, historyAtom } from "@/lib/store";

export default function Aside() {
  const chatHistory = useAtomValue(historyAtom);
  const updateCurrentChat = useSetAtom(currentChatAtom);
  const clickSelect = (item: ChatHistory[]) => {
    updateCurrentChat(item);
  };
  return (
    <div className="w-60 h-screen border-r px-1">
      {chatHistory.map((item, index) => (
        <div key={index}>
          <Button
            onClick={() => clickSelect(item.chatHistory)}
            variant="ghost"
            className="justify-start w-full "
          >
            <span className="truncate">{item.chatHistory[0]?.text}</span>
          </Button>
        </div>
      ))}
    </div>
  );
}
