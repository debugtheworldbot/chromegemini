import React from "react";
import Markdown from "react-markdown";
import { promises as fs } from "fs";
import rehypeRaw from "rehype-raw";

export const dynamicParams = false;
export async function generateStaticParams() {
  const list = await fs.readdir("./src/blogs");
  const result = await Promise.all(
    list.map(async (l) => {
      const path = encodeURIComponent(l.replace(".md", ""));
      return {
        slug: path,
      };
    }),
  );
  return result;
}
const getBlogByPath = async (path: string) => {
  const file = await fs.readFile(
    "./src/blogs/" + decodeURIComponent(path) + ".md",
    "utf-8",
  );
  return file;
};

export default async function page({ params }: { params: { slug: string } }) {
  const content = await getBlogByPath(params.slug);
  return (
    <article className="w-full max-w-3xl mx-auto prose px-4 py-6">
      <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
    </article>
  );
}
