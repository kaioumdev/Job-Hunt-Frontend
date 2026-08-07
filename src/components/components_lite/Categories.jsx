import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  Code2, Server, Layers, Brain, Shield, Palette,
  Video, Database, Smartphone, BarChart2, GitBranch, PenTool,
  MonitorSmartphone, Cpu,
} from "lucide-react";

const CATEGORIES = [
  { label: "Frontend Developer", icon: <MonitorSmartphone size={18} />, color: "text-blue-500 bg-blue-500/10" },
  { label: "Backend Developer", icon: <Server size={18} />, color: "text-green-500 bg-green-500/10" },
  { label: "MERN Developer", icon: <Layers size={18} />, color: "text-violet-500 bg-violet-500/10" },
  { label: "Full Stack Developer", icon: <Code2 size={18} />, color: "text-indigo-500 bg-indigo-500/10" },
  { label: "Artificial Intelligence", icon: <Brain size={18} />, color: "text-pink-500 bg-pink-500/10" },
  { label: "Cybersecurity", icon: <Shield size={18} />, color: "text-red-500 bg-red-500/10" },
  { label: "UI/UX Designer", icon: <Palette size={18} />, color: "text-orange-500 bg-orange-500/10" },
  { label: "Graphic Designer", icon: <PenTool size={18} />, color: "text-yellow-500 bg-yellow-500/10" },
  { label: "Video Editor", icon: <Video size={18} />, color: "text-cyan-500 bg-cyan-500/10" },
  { label: "Data Scientist", icon: <BarChart2 size={18} />, color: "text-teal-500 bg-teal-500/10" },
  { label: "DevOps Engineer", icon: <GitBranch size={18} />, color: "text-slate-500 bg-slate-500/10" },
  { label: "Mobile Developer", icon: <Smartphone size={18} />, color: "text-purple-500 bg-purple-500/10" },
  { label: "Database Admin", icon: <Database size={18} />, color: "text-amber-500 bg-amber-500/10" },
  { label: "Machine Learning", icon: <Cpu size={18} />, color: "text-rose-500 bg-rose-500/10" },
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (label) => {
    dispatch(setSearchedQuery(label));
    navigate("/browse");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Browse by Category</h2>
        <p className="text-slate-500 text-sm md:text-base">Find roles that match your skills and interests</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => handleClick(cat.label)}
            className="group flex flex-col items-center gap-2.5 p-4 bg-white border border-slate-100 rounded-2xl hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 transition-all duration-200 card-hover"
          >
            <div className={`flex items-center justify-center h-10 w-10 rounded-xl ${cat.color} transition-transform group-hover:scale-110`}>
              {cat.icon}
            </div>
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight group-hover:text-violet-600 transition-colors">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
