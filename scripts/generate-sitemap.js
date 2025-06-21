// scripts/generate-sitemap.js
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";

async function buildSitemap() {
  // 1. Define your public URLs
  const pages = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/login", changefreq: "monthly", priority: 0.5 },
    { url: "/signup", changefreq: "monthly", priority: 0.5 },
    // add any other truly public routes here
  ];

  // 2. Create a stream to write to public/sitemap.xml
  const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");
  const writeStream = createWriteStream(sitemapPath);
  const sitemap = new SitemapStream({
    hostname: "https://kanun-legalai.vercel.app",
  });

  // Pipe the sitemap data into the write stream
  sitemap.pipe(writeStream);

  // 3. Write each page entry
  pages.forEach((page) => sitemap.write(page));

  // 4. Close & await completion
  sitemap.end();
  await streamToPromise(writeStream);
  console.log("✅ sitemap.xml generated at public/sitemap.xml");
}

buildSitemap().catch(console.error);
