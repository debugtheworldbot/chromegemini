import { atomWithStorage } from "jotai/utils";

export interface ChatHistory {
  id: number;
  role: "user" | "assistant";
  text: string;
}
export const historyAtom = atomWithStorage<
  {
    createdAt: string;
    chatHistory: ChatHistory[];
  }[]
>("ChatHistory", []);
