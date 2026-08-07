import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Briefcase, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (time) => {
    const diff = new Date() - new Date(time);
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    return d === 0 ? "Today" : `${d}d ago`;
  };

  const typeColor = (type) => {
    if (!type) return "bg-slate-100 text-slate-600";
    const t = type.toLowerCase();
    if (t === "remote") return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    if (t === "internship") return "bg-amber-50 text-amber-700 border border-amber-200";
    return "bg-blue-50 text-blue-700 border border-blue-200";
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group bg-white border border-slate-100 rounded-2xl p-5 cursor-pointer hover:border-violet-200 hover:shadow-xl hover:shadow-violet-50 transition-all duration-200 card-hover flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 rounded-xl border border-slate-100 bg-slate-50">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          </Avatar>
          <div>
            <p className="text-xs font-semibold text-slate-500 leading-tight">{job?.company?.name}</p>
            <div className="flex items-center gap-1 mt-0.5 text-slate-400">
              <MapPin size={11} />
              <span className="text-xs">{job?.location || "Bangladesh"}</span>
            </div>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${typeColor(job?.jobType)}`}>
          {job?.jobType}
        </span>
      </div>

      {/* Title & description */}
      <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-violet-700 transition-colors">
        {job?.title}
      </h3>
      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
        {job?.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Briefcase size={12} />
            {job?.position} {job?.position === 1 ? "opening" : "openings"}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {daysAgo(job?.createdAt)}
          </span>
        </div>
        <span className="text-xs font-bold text-violet-600 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
          View <ChevronRight size={13} />
        </span>
      </div>
    </div>
  );
};

export default JobCards;
