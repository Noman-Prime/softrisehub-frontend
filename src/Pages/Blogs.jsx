import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "engineering", "architecture", "business"];

  const blogPosts = [
    {
      id: "post-01",
      title: "Building Deterministic SaaS Infrastructure at Scale",
      description: "An architectural deep-dive into managing distributed event states, real-time client sync layers, and reducing baseline memory bloat in production environments.",
      category: "engineering",
      date: "June 04, 2026",
      readTime: "7 min read",
      isFeatured: true
    },
    {
      id: "post-02",
      title: "Why We Rejected Traditional AI UI Layout Templates",
      description: "How generic layouts, excessive color gradients, and neon components degrade long-term user retention and consumer trust for modern enterprise products.",
      category: "architecture",
      date: "May 28, 2026",
      readTime: "5 min read",
      isFeatured: false
    },
    {
      id: "post-03",
      title: "Optimizing Stripe Architectures for Multi-Tenant Seeding",
      description: "A developer guide to setting up webhooks, custom merchant pipelines, and robust idempotent tracking systems without breaking local test suites.",
      category: "engineering",
      date: "May 15, 2026",
      readTime: "9 min read",
      isFeatured: false
    },
    {
      id: "post-04",
      title: "The Physics of Conversion: Engineering Structural Authority",
      description: "Shifting software companies from basic template designs into clean, high-contrast user interfaces that signal industry-grade performance to corporate buyers.",
      category: "business",
      date: "May 02, 2026",
      readTime: "4 min read",
      isFeatured: false
    }
  ];

  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts.find(post => post.isFeatured);
  const regularPosts = filteredPosts.filter(post => !post.isFeatured || activeCategory !== "all");

  return (
    <div className="w-full min-h-[100dvh] bg-slate-50 text-slate-900 font-sans antialiased px-4 sm:px-6 lg:px-8 py-20 selection:bg-slate-900 selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER BLOCK */}
        <div className="max-w-2xl mb-12 text-left">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 block mb-3">
            / Intelligence & Insights
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            SoftRiseHub Engineering Journal
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
            Deep-dives into systems architecture, clean visual development, and algorithmic optimization patterns designed for high-conversion SaaS pipelines.
          </p>
        </div>

        {/* CATEGORY FILTER PIPELINE */}
        <div className="w-full flex flex-wrap gap-2 mb-12 border-b border-slate-200 pb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition ${
                activeCategory === cat
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FEATURED POST HERO (Only visible when viewing 'all') */}
        {activeCategory === "all" && featuredPost && (
          <div className="w-full mb-12">
            <Link
              to={`/blog/${featuredPost.id}`}
              className="group block w-full bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.03)] hover:border-slate-300 transition duration-150"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest bg-blue-50 border border-blue-200 text-blue-600 rounded uppercase">
                      Featured // {featuredPost.category}
                    </span>
                    <span className="text-slate-300 text-xs">•</span>
                    <span className="text-xs text-slate-400 font-medium">{featuredPost.date}</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition duration-150">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="mt-3 text-sm text-slate-500 font-normal leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:translate-x-1 transition duration-150">
                  <span>Read Article</span>
                  <span className="font-mono">-&gt;</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ARTICLES GRID MATRIX */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group flex flex-col justify-between bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition duration-150 h-full min-h-[280px]"
            >
              <div className="w-full min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {post.category}
                  </span>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-[11px] text-slate-400 font-normal">{post.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition duration-150 line-clamp-2">
                  {post.title}
                </h3>

                <p className="mt-2.5 text-xs text-slate-500 font-normal leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="w-full pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                <span>{post.readTime}</span>
                <span className="font-mono group-hover:translate-x-0.5 transition duration-150 text-slate-900 font-bold">
                  View -&gt;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY STATE DATA GUARD */}
        {filteredPosts.length === 0 && (
          <div className="w-full text-center py-20 bg-white border border-slate-200/80 rounded-2xl font-mono text-xs text-slate-400">
            NO_ARTICLES_FOUND_IN_CATEGORY
          </div>
        )}

      </div>
    </div>
  );
};

export default Blogs;