import pluginRss from "@11ty/eleventy-plugin-rss";

export default async function (eleventyConfig) {
  // ---------- Plugins ----------
  eleventyConfig.addPlugin(pluginRss);

  // ---------- Pass-through static assets ----------
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy({ "src/_static": "/" });

  // Watch CSS so the dev server reloads on edits
  eleventyConfig.addWatchTarget("src/css/");

  // ---------- Collections ----------

  // Posts, newest first
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // All real tags (excluding the structural "posts"/"all" tags), sorted alphabetically
  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tagSet = new Set();
    for (const item of collectionApi.getAll()) {
      for (const t of item.data.tags || []) {
        if (t === "posts" || t === "all") continue;
        tagSet.add(t);
      }
    }
    return [...tagSet].sort((a, b) => a.localeCompare(b));
  });

  // ---------- Filters ----------

  eleventyConfig.addFilter("readableDate", (value) => {
    return new Date(value).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("isoDate", (value) => new Date(value).toISOString());

  // Turn a 1–10 regret score into pips (●●●●○○○○○○)
  eleventyConfig.addFilter("regretPips", (score) => {
    const n = Math.max(0, Math.min(10, Number(score) || 0));
    return "●".repeat(n) + "○".repeat(10 - n);
  });

  // Printf-style format filter — e.g. "%03d" | format(7) → "007"
  eleventyConfig.addFilter("format", (fmt, value) => {
    return fmt.replace(/%0(\d+)d/, (_, width) =>
      String(value).padStart(parseInt(width, 10), "0")
    );
  });

  // Strip the structural "posts"/"all" tags so templates only render meaningful ones
  eleventyConfig.addFilter("realTags", (tags) => {
    return (tags || []).filter((t) => t !== "posts" && t !== "all");
  });

  // ---------- Config ----------
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
