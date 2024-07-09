import Link from "next/link";
import React from "react";
import { promises as fs } from "fs";
import { Button } from "@/components/ui/button";
import { Chrome, Github } from "lucide-react";

export default async function page() {
  const list = await getBlogList();
  return (
    <div>
      <header className="sticky p-4 top-0 max-w-4xl mx-auto bg-white/50 backdrop-blur flex justify-between gap-2">
        <div>
          <Link href="/">
            <h1 className="font-cal text-3xl flex gap-4">
              ChromeAI.org{"'"}s Blog
            </h1>
          </Link>
        </div>
        <div className="flex flex-wrap md:gap-4 gap-2 items-center">
          <Link
            className="hidden md:block"
            target="_blank"
            href="https://chromewebstore.google.com/detail/pienijlenieciiamahkllplgadmdibjm"
          >
            <Button className="flex gap-2" variant="outline">
              <Chrome />
              Extension
            </Button>
          </Link>
          <Link
            href="https://github.com/debugtheworldbot/chromegemini"
            target="_blank"
          >
            <Button size="icon" variant="ghost">
              <Github />
            </Button>
          </Link>
        </div>
      </header>
      <main className="w-full max-w-3xl mx-auto py-6 pl-8 sm:px-4 sm:pl-0 ">
        <ul className="list-disc">
          {list.map((l, index) => (
            <li key={index} className="mb-8">
              <Link className="block" href={`/blog/${l.path}`}>
                <h1 className="underline text-2xl">{l.title}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

const getBlogList = async () => {
  const list = await fs.readdir("./src/blogs");
  const result = list.map((l) => {
    const path = l.replace(".md", "");
    const title = path.split("-").join(" ");
    return {
      title,
      path: path,
    };
  });

  return result;
};
