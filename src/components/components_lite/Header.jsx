import React, { useState } from "react";
import { Search, Zap, MapPin, TrendingUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const TRENDING = ["MERN Developer", "React", "Node.js", "Python", "DevOps", "UI/UX"];

const STATS = [
  { value: "88+", label: "Live Jobs" },
  { value: "14+", label: "Companies" },
  { value: "7", label: "Cities" },
  { value: "100%", label: "Free to Apply" },
];

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (q) => {
    dispatch(setSearchedQuery(q || query));
    navigate("/browse");
  };

  return (
    <section className="relative bg-[#0f1117] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/20 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-16">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold px-4 py-2 rounded-full">
            <Zap size={12} className="fill-violet-400 text-violet-400" />
            Bangladesh's #1 Developer Job Marketplace
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center leading-tight tracking-tight mb-5">
          Find Your Next{" "}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
              Tech Role
            </span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" fill="none">
              <path d="M0 8 Q150 0 300 8" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>{" "}
          in Bangladesh
        </h1>

        <p className="text-slate-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-10">
          Connecting developers, designers &amp; tech professionals with top companies across Dhaka, Chattogram, and beyond.
        </p>

        {/* Search box */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center bg-white/[0.05] border border-white/[0.12] rounded-2xl p-1.5 focus-within:border-violet-500/60 focus-within:bg-white/[0.07] transition-all shadow-xl shadow-black/20">
            <div className="flex items-center gap-2 px-3 text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchHandler()}
              placeholder="Job title, skill, or keyword..."
              className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 text-base py-3 pr-2"
            />
            <button
              onClick={() => searchHandler()}
              className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-violet-500/20"
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* Trending tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          <span className="flex items-center gap-1 text-slate-500 text-xs">
            <TrendingUp size={12} /> Trending:
          </span>
          {TRENDING.map((tag) => (
            <button
              key={tag}
              onClick={() => searchHandler(tag)}
              className="text-xs text-slate-400 bg-white/[0.04] border border-white/[0.08] hover:border-violet-500/40 hover:text-violet-300 px-3 py-1 rounded-full transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="text-center bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
              <div className="text-2xl font-extrabold text-white mb-0.5">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f8f9fc] to-transparent" />
    </section>
  );
};

export default Header;
