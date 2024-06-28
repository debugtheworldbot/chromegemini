"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  Chat,
  ChatHistory,
  currentChatAtom,
  historyAtom,
  sideTriggerAtom,
} from "@/lib/store";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";

export default function Aside() {
  const visible = useAtomValue(sideTriggerAtom);
  const [chatHistory, setChatHistory] = useAtom(historyAtom);
  const updateCurrentChat = useSetAtom(currentChatAtom);
  const clickSelect = (item: Chat[]) => {
    updateCurrentChat(item);
  };

  const deleteChat = (item: ChatHistory) => {
    setChatHistory((h) => h.filter((i) => i.id !== item.id));
  };

  return (
    <div
      className={cn(
        "w-60 h-screen py-16 transition-all hidden md:block",
        visible ? "translate-x-0 pl-2 border-r" : "-translate-x-full w-0 h-0",
      )}
    >
      {chatHistory.map((item, index) => (
        <div key={index} className="flex w-full relative overflow-hidden group">
          <Button
            onClick={() => clickSelect(item.chatHistory)}
            variant="ghost"
            className="justify-start w-full"
          >
            <span className="truncate">{item.chatHistory[0]?.text}</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => deleteChat(item)}
            className="absolute right-0 transition-all group-hover:opacity-100 opacity-0 bg-white/20 backdrop-blur"
          >
            <CircleX />
          </Button>
        </div>
      ))}
      <p className="text-sm text-gray-400 text-center mt-4 overflow-hidden">
        History is stored locally
      </p>
    </div>
  );
}
