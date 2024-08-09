import { checkSummarize } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export type SummarizeModal = {
  summarize: (input: string) => Promise<string>;
  summarizeStreaming: (input: string) => Promise<string>;
  destroy: () => Promise<void>;
  ready: Promise<void>;
  addEventListener: (type: string, listener: (event: any) => void) => void;
};
// const checkSum = async () => {
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
// };

export const useSummarize = () => {
  const [checking, setChecking] = useState(true);
  const [canSummarize, setCanSummarize] = useState<null | boolean>(null);
  const [error, setError] = useState<null | string>(null);

  const summarize = useCallback(async (input: string) => {
    const summarizer: SummarizeModal = await window.ai.summarizer.create();
    console.log("i", input);
    const result = await summarizer.summarize(input);
    console.log("r", result);
    summarizer.destroy();
    return result;
  }, []);

  const summarizeStreaming = useCallback(async (input: string) => {
    const summarizer: SummarizeModal = await window.ai.summarizer.create();
    console.log("i", input);
    const result = await summarizer.summarizeStreaming(input);
    console.log("r", result);
    // summarizer.destroy();
    return result;
  }, []);

  const update = useCallback(async () => {
    try {
      await checkSummarize();
      setCanSummarize(true);
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
  return { error, checking, summarize, canSummarize, summarizeStreaming };
};
