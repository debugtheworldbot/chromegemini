import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from "./externalLink";
import { CodeSnippet } from "./codeSnippet";
import Link from "next/link";

interface FlagAccordionProps {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function FlagAccordion({ value, setValue }: FlagAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={value}
      onValueChange={setValue}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Demo</AccordionTrigger>
        <AccordionContent>
          <video
            src="https://chromeai.org/prod.mp4"
            autoPlay
            loop
            height={360}
            width={780}
            preload="none"
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Supported Browsers</AccordionTrigger>
        <AccordionContent>
          Please make sure you are using Chrome (
          <ExternalLink href="https://www.google.com/chrome/dev/?extra=devchannel">
            Dev
          </ExternalLink>{" "}
          /{" "}
          <ExternalLink href="https://www.google.com/chrome/canary/">
            Canary
          </ExternalLink>
          ) version 127 or higher.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Necessary Experimental Flags</AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center justify-center">
            <div className="space-y-4 w-full">
              <ul className="grid gap-4 counter-reset:step">
                {flags.map((f, i) => (
                  <li
                    key={"flag_" + i.toString()}
                    className="flex items-center gap-4 text-sm"
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 text-xs items-center justify-center rounded-full bg-primary text-primary-foreground counter:step">
                      {i + 1}
                    </div>
                    <div className="w-full">
                      <h4 className="font-medium mb-1 -ml-1">
                        <CodeSnippet>{f.flag}</CodeSnippet>
                      </h4>
                      <p className="text-muted-foreground">{f.instruction}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div>
                If you followed the instructions, still can&#39;t see
                <span className="font-medium mx-1">
                  Optimization Guide On Device Model,
                </span>
                it means the model is not downloaded yet. Please just wait a
                moment. You can click the Rechck button to recheck download
                status.
              </div>
              <p>
                PS: Make sure you are logged into chrome. For now, Incognito and
                Guest modes are not supported.
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger className="text-left">
          Compare the results among ChromeAI, ChatGPT, Claude, and Llama
        </AccordionTrigger>
        <AccordionContent>
          Compare the results among ChromeAI, ChatGPT, Claude, and Llama in{" "}
          <Link
            className="underline"
            href="https://chathub.gg/?via=ChromeAIorg"
            target="_blank"
          >
            ChatHub
          </Link>
          .
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const flags: { flag: string; instruction: string }[] = [
  {
    flag: "chrome://flags/#prompt-api-for-gemini-nano",
    instruction: "Select 'Enabled'",
  },
  {
    flag: "chrome://flags/#optimization-guide-on-device-model",
    instruction: "Select 'Enabled BypassPrefRequirement'",
  },
  {
    flag: "chrome://components",
    instruction: `Click 'Check for Update' on Optimization Guide On Device Model to download the model. If you don't see Optimization Guide, ensure you have set the flags correctly above, relaunch your browser, and refresh the page.`,
  },
];
