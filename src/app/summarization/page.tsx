"use client";
import { CodeSnippet } from "@/components/codeSnippet";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";
import { useSummarize } from "@/hooks/use-summarize";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { BadgeHelp, Loader } from "lucide-react";
import React, { useState } from "react";

const MAX_MODEL_CHARS = 4000;
export default function Page() {
  const { canSummarize, error, checking, summarizeStreaming } = useSummarize();
  const [result, setResult] = useState<string>();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen w-screen">
      <Header />
      <h1 className="text-center text-4xl font-medium mt-8">
        Summarization by Gemini Nano
        <HoverCard>
          <HoverCardTrigger>
            <BadgeHelp className="inline-block align-top ml-2 cursor-pointer hover:underline" />
          </HoverCardTrigger>
          <HoverCardContent className="pl-8 md:w-96">
            <h2 className="text-xl">Caveats</h2>
            <ul className="list-disc text-base font-normal text-left">
              <li>
                This api is not very stable, if the button is keep loading, try
                click more times.
              </li>
              <li>Only English input and output are supported.</li>
              <li>
                No support of any options (e.g. length guidance, style, etc) for
                the time being.
              </li>
              <li>
                The context window is currently limited to 1024 tokens but we
                use about 26 of those under the hood.
                <p> 1 token is roughly equal to 4 English characters.</p>
              </li>
            </ul>
          </HoverCardContent>
        </HoverCard>
      </h1>
      {checking ? (
        <p className="text-2xl font-medium flex justify-center items-center mt-12">
          <Loader className="animate-spin mr-2" /> Checking your browser...
        </p>
      ) : canSummarize ? (
        <main className="overflow-scroll">
          <form
            onSubmit={async (e) => {
              try {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const input = formData.get("input") as string;
                setLoading(true);
                const res = await summarizeStreaming(input);
                for await (const chunk of res) {
                  setResult(chunk);
                }
                setLoading(false);
              } catch (e) {
                console.log("error", e);
              }
            }}
            className="lg:max-w-5xl mt-8 lg:mx-auto mx-8"
          >
            <Textarea
              name="input"
              rows={10}
              maxLength={MAX_MODEL_CHARS}
              required
            />
            <Button
              // disabled={loading}
              type="submit"
              className="block mx-auto mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin" />
                  Summarizing...
                </span>
              ) : (
                "Summarize"
              )}
            </Button>
          </form>
          {result && (
            <div className="mx-12">
              <h2 className="text-2xl font-medium mt-8">Summary</h2>
              <div className="mt-4 text-lg bg-[#f5f5f5] p-4 rounded-xl">
                {result}
              </div>
            </div>
          )}
        </main>
      ) : (
        <main className="text-2xl p-12 flex flex-col items-center">
          <p className="text-red-500">Error: {error}</p>
          <div className="inline-block mt-6">
            Please make sure:
            <ul className="list-disc">
              <li>
                <CodeSnippet>
                  chrome://flags/#summarization-api-for-gemini-nano
                </CodeSnippet>{" "}
                is enabled
              </li>
              <li>your chrome version is 129.0.6639.0 or above</li>
            </ul>
          </div>
        </main>
      )}
    </div>
  );
}
