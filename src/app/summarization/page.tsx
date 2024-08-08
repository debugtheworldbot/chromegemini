"use client";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSummarize } from "@/hooks/use-summarize";
import { Loader } from "lucide-react";
import React, { useState } from "react";

export default function Page() {
  const { model } = useSummarize();
  const [result, setResult] = useState<string>();
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen w-screen flex">
      <main className="flex h-screen overflow-scroll flex-1 flex-col">
        <Header />

        <h1 className="text-center text-4xl font-medium mt-8">
          Summarization by Gemini Nano
        </h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const input = formData.get("input") as string;
            setLoading(true);
            const res = await model?.summarize(input);
            setResult(res);
            setLoading(false);
          }}
          className="px-12 mt-8"
        >
          <Textarea name="input" rows={10} required />
          <Button
            disabled={loading}
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
    </div>
  );
}
