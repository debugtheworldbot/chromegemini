import { useEffect, useState } from "react";

const checkAI = async () => {
  if ("ai" in window) {
    if ((await window.ai.canCreateTextSession()) === "readily") {
      return true;
    }
  }
  return false;
};
export const useCheckAI = () => {
  const [isAI, setIsAI] = useState<null | boolean>(null);
  const [model, setModel] = useState<{ prompt: any; promptStreaming: any }>();
  const updateIsAI = async () => {
    const checkAIStatus = await checkAI();
    if (checkAIStatus) {
      const thisModel = await window.ai.createTextSession();
      setModel(thisModel);
    }

    setIsAI(checkAIStatus);
  };

  useEffect(() => {
    updateIsAI();
  }, []);
  return { isAI, model };
};
