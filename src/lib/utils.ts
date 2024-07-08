import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function checkEnv() {
  function getChromeVersion() {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : 0;
  }

  const version = getChromeVersion();
  if (version < 127 && !("ai" in globalThis)) {
    throw new Error(
      "Your browser is not supported. Please update to 127 version or greater.",
    );
  }

  if (!("ai" in globalThis)) {
    throw new Error(
      "Prompt API is not available, check your configuration in chrome://flags/#prompt-api-for-gemini-nano",
    );
  }

  // @ts-expect-error
  const state: AIModelAvailability = await ai?.canCreateTextSession();
  if (state !== "readily") {
    throw new Error(
      "Built-in AI is not ready, check your configuration in chrome://flags/#optimization-guide-on-device-model",
    );
  }
}

export const convertTitleToPath = (title: string) => {
  return title.split(" ").join("_");
};
export const convertParamToTitle = (param: string) => {
  return param.split("_").join(" ");
};
