import Link from "next/link";
import React from "react";
import { promises as fs } from "fs";
import dayjs from "dayjs";

export default async function page() {
  const list = await getBlogList();
  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4">
      {list.map((l, index) => (
        <div key={index} className="mb-4">
          <Link className="block" href={`/blog/${l.path}`}>
            <h1 className="underline text-2xl">{l.title}</h1>
          </Link>
          <p>{dayjs(l.date).format("YYYY-MM-DD HH:mm")}</p>
        </div>
      ))}
    </div>
  );
}

const getBlogList = async () => {
  const list = await fs.readdir("./src/blogs");
  const result = await Promise.all(
    list.map(async (l) => {
      const d = await fs.stat("./src/blogs/" + l);
      const path = l.replace(".md", "");
      const title = path.split("-").join(" ");
      return {
        title,
        path,
        date: d.mtime,
      };
    }),
  );
  return result;
};
