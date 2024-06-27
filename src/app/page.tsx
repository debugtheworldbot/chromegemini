import ChatBox from "@/components/chatbox";
import Header from "@/components/header";
import Aside from "@/components/aside";
import SideTrigger from "@/components/sideTrigger";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex">
      <SideTrigger />
      <Aside />
      <main className="flex h-screen overflow-scroll ml-8 flex-1 flex-col">
        <Header />

        <div className="max-w-4xl h-full flex flex-col mx-auto">
          <ChatBox />
        </div>
      </main>
    </div>
  );
}
