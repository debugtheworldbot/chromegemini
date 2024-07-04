import { ModelSettings } from "@/components/settingsDialog";
import { atomWithStorage } from "jotai/utils";

export interface ChatHistory {
  id: string;
  chatHistory: Chat[];
}
export interface Chat {
  id: number;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
}
export const historyAtom = atomWithStorage<ChatHistory[]>("ChatHistory", []);

export const currentChatAtom = atomWithStorage<Chat[]>("CurrentChat", []);

export const sideTriggerAtom = atomWithStorage<boolean>("SideTrigger", true);

export const settingsAtom = atomWithStorage<ModelSettings>("Settings", {
  model: "generic",
  temperature: 0.8,
  topK: 3,
});
