"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAtomValue } from "jotai";
import { historyAtom } from "@/lib/store";

export default function Aside() {
  const chatHistory = useAtomValue(historyAtom);
  return (
    <div className="w-60 h-screen border-r px-1">
      {chatHistory.map((item, index) => (
        <div key={index}>
          <Button variant="ghost" className="justify-start w-full ">
            <span className="truncate">{item.chatHistory[0].text}</span>
          </Button>
        </div>
      ))}
    </div>
  );
}
