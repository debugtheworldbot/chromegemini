import { settingsAtom } from "@/lib/store";
import { checkEnv, getAiApi } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

export type AIModelAvailability = "unavailable" | "downloadable" | "downloading" | "available";
export type Modal = {
  prompt: any;
  promptStreaming: any;
  destroy: () => void;
};

const checkAI = async () => {
  await checkEnv();
  return true;
};
export const useCheckAI = () => {
  const [isAI, setIsAI] = useState<null | boolean>(null);
  const settings = useAtomValue(settingsAtom);
  const [model, setModel] = useState<Modal>();
  const [error, setError] = useState<null | string>(null);

  const updateModel = useCallback(async () => {
    const aiApi = getAiApi();
    const m = await aiApi.create({
      topK: settings.topK,
      temperature: settings.temperature,
    });
    setModel(m);
  }, [settings.temperature, settings.topK]);

  const updateIsAI = useCallback(async () => {
    try {
      const checkAIStatus = await checkAI();
      if (checkAIStatus) {
        updateModel();
      }

      setIsAI(checkAIStatus);
    } catch (e) {
      if (e instanceof Error) {
        setError(e?.message);
      }
      setIsAI(false);
    }
  }, [updateModel]);

  useEffect(() => {
    updateIsAI();
  }, [updateIsAI]);
  return { isAI, model, error, updateModel };
};
