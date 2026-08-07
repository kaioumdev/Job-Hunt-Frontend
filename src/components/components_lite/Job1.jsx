import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Bookmark, MapPin, Clock, DollarSign, Users, Briefcase } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { saveJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isSaved = savedJobs?.some((s) => s._id === job._id);

  const daysAgo = (time) => {
    const d = Math.floor((new Date() - new Date(time)) / (1000 * 60 * 60 * 24));
    return d === 0 ? "Today" : `${d}d ago`;
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (!user) { toast.error("Please login to save jobs"); navigate("/login"); return; }
    dispatch(saveJob(job));
    toast.success(isSaved ? "Removed from saved" : "Job saved!");
  };

  const typeColor = (type) => {
    if (!type) return "bg-slate-100 text-slate-600";
    const t = type.toLowerCase();
    if (t === "remote") return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    if (t === "internship") return "bg-amber-50 text-amber-700 border border-amber-200";
    return "bg-blue-50 text-blue-700 border border-blue-200";
  };

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-50 transition-all duration-200 card-hover flex flex-col h-full">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 rounded-xl border border-slate-100 bg-slate-50">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-slate-800 leading-tight">{job?.company?.name}</p>
            <div className="flex items-center gap-1 mt-0.5 text-slate-400">
              <MapPin size={11} />
              <span className="text-xs">{job?.location || "Bangladesh"}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColor(job?.jobType)}`}>
            {job?.jobType}
          </span>
          <button
            onClick={handleSave}
            className={`p-1.5 rounded-lg transition-colors ${isSaved ? "bg-violet-100 text-violet-600" : "text-slate-300 hover:text-violet-500 hover:bg-violet-50"}`}
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-violet-700 transition-colors">
        {job?.title}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
        {job?.description}
      </p>

      {/* Meta pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full font-medium">
          <Users size={11} /> {job?.position} {job?.position === 1 ? "opening" : "openings"}
        </span>
        <span className="flex items-center gap-1 text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full font-medium">
          <DollarSign size={11} /> {job?.salary}
        </span>
        <span className="flex items-center gap-1 text-xs bg-slate-50 text-slate-500 px-2.5 py-1 rounded-full">
          <Clock size={11} /> {daysAgo(job?.createdAt)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-slate-50">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-sm shadow-violet-500/20"
        >
          View Details
        </button>
        <button
          onClick={handleSave}
          className={`px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
            isSaved
              ? "bg-violet-50 border-violet-200 text-violet-600"
              : "border-slate-200 text-slate-500 hover:border-violet-200 hover:text-violet-500"
          }`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Job1;
