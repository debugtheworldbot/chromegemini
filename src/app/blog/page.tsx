import Link from "next/link";
import React from "react";
import { promises as fs } from "fs";

export default async function page() {
  const list = await getBlogList();
  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4">
      <ul className="list-disc">
        {list.map((l, index) => (
          <li key={index} className="mb-4">
            <Link className="block" href={`/blog/${l.path}`}>
              <h1 className="underline text-2xl">{l.title}</h1>
            </Link>
          </li>
        ))}
      </ul>
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
      path,
    };
  });

  return result;
};
