import React from "react";
import { Button } from "./ui/button";

const history = [
  {
    name: "History 1",
    description: "Description 1",
  },
  {
    name: "History 2",
    description: "Description 2",
  },
];
export default function Aside() {
  return (
    <div className="w-60 h-screen border-r">
      {history.map((item) => (
        <div key={item.name}>
          <Button variant="ghost" className="text-xl w-full">
            {item.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
