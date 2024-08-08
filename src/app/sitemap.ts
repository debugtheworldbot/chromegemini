import { MetadataRoute } from "next";
import { promises as fs } from "fs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPaths = await getBlogPaths();
  const blogs = blogPaths.map((path) => ({
    url: `https://chromeai.org/blog/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  })) as MetadataRoute.Sitemap;
  return [
    {
      url: "https://chromeai.org",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://chromeai.org/help",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://chromeai.org/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://chromeai.org/summarization",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...blogs,
  ];
}
const getBlogPaths = async () => {
  const list = await fs.readdir("./src/blogs");
  const result = list.map((l) => {
    const path = l.replace(".md", "");
    return path;
  });

  return result;
};
