import { useState } from "react";
import { IncompatibleBrowserAlert } from "./incompatibleAlert";
import { FlagAccordion } from "./flagTable";
import Link from "next/link";
import { CodeSnippet } from "./codeSnippet";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "./ui/dialog";

export function Modal({ error }: { error?: any }) {
  const [selectedAccordionValue, setSelectedSelectedAccordionValue] = useState<
    string | undefined
  >();
  const openInstructions = () => setSelectedSelectedAccordionValue("item-4");
  const showSupportedBrowsers = () =>
    setSelectedSelectedAccordionValue("item-3");

  return (
    <Dialog open>
      <DialogOverlay className="bg-black/10" />
      <DialogContent
        className="sm:h-fit h-full flex flex-col sm:block sm:max-h-screen sm:justify-center py-4 px-8 max-w-2xl overflow-y-scroll"
        hideCloseButton
      >
        <DialogTitle className="text-3xl text-center mb-4">
          ChromeAI Gemini Chatbot
        </DialogTitle>
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
      </DialogContent>
    </Dialog>
  );
}
