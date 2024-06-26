import { Badge } from "@/components/ui/badge";
import ChatBox from "@/components/chatbox";
import Aside from "@/components/aside";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex">
      <Aside />
      <main className="flex h-screen w-full flex-1 flex-col">
        <div className="mx-auto flex flex-col h-full flex-1 px-4 py-4 border-border w-full rounded-lg border backdrop-blur-[2px] md:p-6">
          <div className="mx-auto flex w-full flex-col gap-8 h-full flex-1">
            <div className="col-span-full flex items-start justify-between gap-1">
              <div className="flex min-w-0 flex-col gap-1 h-full">
                <h1 className="font-cal text-3xl">Chrome AI Test Page</h1>
                <div className="flex gap-4">
                  <span className="text-muted-foreground">
                    Running large language models locally in the browser
                  </span>
                  <Badge>Gemini Nano</Badge>
                </div>
              </div>
            </div>

            <ChatBox />
          </div>
        </div>
      </main>
    </div>
  );
}
