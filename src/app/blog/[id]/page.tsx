import React from "react";
import { blogList } from "@/lib/blogs";
import Markdown from "react-markdown";
import { convertParamToTitle } from "@/lib/utils";

export default function page({ params }: { params: { id: string } }) {
  const path = convertParamToTitle(params.id);
  const page = blogList.find((l) => l.title === decodeURIComponent(path));
  console.log(page, decodeURIComponent(params.id));
  return (
    <article className="w-full max-w-3xl mx-auto prose px-4 py-6">
      <h1 className="text-5xl font-bold">{page?.title}</h1>
      <Markdown>{page?.content}</Markdown>
    </article>
  );
}
