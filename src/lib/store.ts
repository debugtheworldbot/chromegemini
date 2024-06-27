import { atomWithStorage } from "jotai/utils";

export interface ChatHistory {
  id: number;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
}
export const historyAtom = atomWithStorage<
  {
    id: string;
    chatHistory: ChatHistory[];
  }[]
>("ChatHistory", []);

export const currentChatAtom = atomWithStorage<ChatHistory[]>(
  "CurrentChat",
  [],
);
