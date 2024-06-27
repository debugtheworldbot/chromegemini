import ChatBox from "@/components/chatbox";
import Header from "@/components/header";
import Aside from "@/components/aside";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex">
      <Aside />
      <main className="flex h-screen ml-4 flex-1 flex-col">
        <div className="mx-auto flex flex-col h-full flex-1 px-4 py-4 w-full rounded-lg md:p-6">
          <div className="mx-auto flex w-full flex-col gap-8 h-full flex-1">
            <Header />

            <div className="max-w-3xl h-full flex flex-col">
              <ChatBox />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
