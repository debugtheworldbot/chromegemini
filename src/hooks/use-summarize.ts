import { useCallback, useEffect, useState } from "react";

export type SummarizeModal = {
  summarize: (input: string) => Promise<string>;
  destroy: () => Promise<void>;
  ready: Promise<void>;
  addEventListener: (type: string, listener: (event: any) => void) => void;
};
const checkSummarize = async () => {
  const canSummarize = await window.ai.summarizer.capabilities();
  // let summarizer: SummarizeModal | null = null;
  // if (canSummarize && canSummarize.available !== "no") {
  //   if (canSummarize.available === "readily") {
  //     // The summarizer can immediately be used.
  //     summarizer = await window.ai.summarizer.create();
  //   } else {
  //     // The summarizer can be used after the model download.
  //     summarizer = await window.ai.summarizer.create();
  //     summarizer?.addEventListener("downloadprogress", (e: any) => {
  //       console.log(e.loaded, e.total);
  //     });
  //     await summarizer?.ready;
  //   }
  // } else {
  //   // The summarizer can't be used at all.
  // }
  return {
    canSummarize,
    // summarizer,
  };
};

export const useSummarize = () => {
  const [checking, setChecking] = useState(true);
  const [canSummarize, setCanSummarize] = useState<null | boolean>(null);
  const [error, setError] = useState<null | string>(null);

  const summarize = useCallback(async (input: string) => {
    window.ai.summarizer?.destroy && (await window.ai.summarizer.destroy());
    const summarizer: SummarizeModal = await window.ai.summarizer.create();
    const result = await summarizer.summarize(input);
    return result;
  }, []);

  const update = useCallback(async () => {
    try {
      const { canSummarize } = await checkSummarize();
      setCanSummarize(canSummarize);
    } catch (e) {
      if (e instanceof Error) {
        setError(e?.message);
      }
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    update();
  }, [update]);
  return { error, checking, summarize, canSummarize };
};
