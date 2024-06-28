import { useState } from "react";
import { IncompatibleBrowserAlert } from "./incompatibleAlert";
import { FlagAccordion } from "./flagTable";
import Link from "next/link";
import { CodeSnippet } from "./codeSnippet";

export function Modal({ error }: { error?: any }) {
  const [selectedAccordionValue, setSelectedSelectedAccordionValue] = useState<
    string | undefined
  >();
  const openInstructions = () => setSelectedSelectedAccordionValue("item-4");
  const showSupportedBrowsers = () =>
    setSelectedSelectedAccordionValue("item-3");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
      <div className="h-full sm:h-fit flex flex-col items-center justify-start sm:justify-center gap-4 sm:rounded-lg bg-white p-8 max-w-2xl overflow-y-scroll">
        <h2 className="text-3xl font-bold">ChromeAI Gemini Chatbot</h2>
        <p>
          Gemini Nano&apos;s Prompt API is exposed on the browser&apos;s
          <CodeSnippet>window.ai</CodeSnippet>function. It can be easily called
          from your browser locally.
          <Link className="underline text-gray-500 ml-2" href="/help">
            More help
          </Link>
        </p>
        <div className="w-full pt-2 space-y-2">
          {error ? (
            <IncompatibleBrowserAlert
              error={error}
              openInstructions={openInstructions}
              showSupportedBrowsers={showSupportedBrowsers}
            />
          ) : null}
          <FlagAccordion
            value={selectedAccordionValue}
            setValue={setSelectedSelectedAccordionValue}
          />
        </div>
      </div>
    </div>
  );
}
