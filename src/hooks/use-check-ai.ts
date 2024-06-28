import { checkEnv } from "@/lib/utils";
import { useEffect, useState } from "react";

const checkAI = async () => {
  await checkEnv();
  return true;
};
export const useCheckAI = () => {
  const [isAI, setIsAI] = useState<null | boolean>(null);
  const [model, setModel] = useState<{ prompt: any; promptStreaming: any }>();
  const [error, setError] = useState<null | string>(null);
  const updateIsAI = async () => {
    try {
      const checkAIStatus = await checkAI();
      if (checkAIStatus) {
        const thisModel = await window.ai.createTextSession();
        setModel(thisModel);
      }

      setIsAI(checkAIStatus);
    } catch (e) {
      if (e instanceof Error) {
        setError(e?.message);
      }
    }
  };

  useEffect(() => {
    updateIsAI();
  }, []);
  return { isAI, model, error };
};
