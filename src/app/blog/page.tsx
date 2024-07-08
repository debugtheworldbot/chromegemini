import Link from "next/link";
import React from "react";
import { blogList } from "@/lib/blogs";
import { convertTitleToPath } from "@/lib/utils";

export default function page() {
  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4">
      {blogList.map((l, index) => (
        <div key={index} className="mb-4">
          <Link className="block" href={`/blog/${convertTitleToPath(l.title)}`}>
            <h1 className="underline text-2xl">{l.title}</h1>
          </Link>
          <p>{l.date}</p>
        </div>
      ))}
    </div>
  );
}
