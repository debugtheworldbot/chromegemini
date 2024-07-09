import { settingsAtom } from "@/lib/store";
import { checkEnv } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

export type AIModelAvailability = "readily" | "after-download" | "no";

const checkAI = async () => {
  await checkEnv();
  return true;
};
export const useCheckAI = () => {
  const [isAI, setIsAI] = useState<null | boolean>(null);
  const settings = useAtomValue(settingsAtom);
  const [model, setModel] = useState<{ prompt: any; promptStreaming: any }>();
  const [error, setError] = useState<null | string>(null);

  const updateModel = useCallback(async () => {
    const model = await window.ai.createTextSession({
      topK: settings.topK,
      temperature: settings.temperature,
    });
    setModel(model);
  }, [settings]);
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
  return { isAI, model, error };
};
