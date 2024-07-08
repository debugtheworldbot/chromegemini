import React from "react";
import { blogList } from "@/lib/blogs";
import Markdown from "react-markdown";
import { convertParamToTitle, convertTitleToPath } from "@/lib/utils";

export const dynamicParams = false;
export async function generateStaticParams() {
  const list = blogList.map((post) => ({
    slug: convertTitleToPath(post.title),
  }));

  return list;
}

export default function page({ params }: { params: { slug: string } }) {
  const page = getBlog(params.slug);
  return (
    <article className="w-full max-w-3xl mx-auto prose px-4 py-6">
      <h1 className="text-5xl font-bold">{page?.title}</h1>
      <Markdown>{page?.content}</Markdown>
    </article>
  );
}

function getBlog(id: string) {
  const path = convertParamToTitle(id);
  const page = blogList.find((l) => l.title === decodeURIComponent(path));
  return page;
}
