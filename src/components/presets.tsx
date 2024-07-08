import React from "react";
import { Card } from "./ui/card";
import { Languages, Mailbox, SquareTerminal } from "lucide-react";

const list = [
  {
    icon: <Languages />,
    title:
      "Translate this to Chinese: On-device AI brings powerful models to users, while protecting data privacy and improving latency.",
  },
  {
    icon: <Mailbox />,
    title:
      "Write a Email to my boss about the project, Highlight recent achievements or milestones. Identify any challenges or issues encountered and how they are being addressed.",
  },
  {
    icon: <SquareTerminal />,
    title: "Create a webpage using HTML, CSS, and JavaScript.",
  },
];
export default function Presets({
  onSelect,
}: {
  onSelect: (p: string) => void;
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-4 px-4">
      {list.map((l) => (
        <Card
          key={l.title}
          className="p-4 cursor-pointer hover:scale-105 transition-all"
          onClick={() => onSelect(l.title)}
        >
          {l.icon}
          <div className="mt-2 text-gray-500">{l.title}</div>
        </Card>
      ))}
    </div>
  );
}
