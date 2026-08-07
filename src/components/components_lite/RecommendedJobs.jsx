import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, AvatarImage } from "../ui/avatar";
import { MapPin, Clock, Users, Sparkles } from "lucide-react";
import { JOB_API_ENDPOINT } from "@/utils/data";

const RecommendedJobs = ({ jobId }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/recommendations/${jobId}`, { withCredentials: true });
        if (res.data.status) setJobs(res.data.jobs);
      } catch (e) { console.error(e.message); }
      finally { setLoading(false); }
    };
    fetch();
  }, [jobId]);

  const daysAgo = (t) => {
    const d = Math.floor((new Date() - new Date(t)) / 86400000);
    return d === 0 ? "Today" : `${d}d ago`;
  };

  if (loading) {
    return (
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={18} className="text-violet-500" />
          <h2 className="font-bold text-slate-900 text-lg">Recommended For You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/3 rounded bg-slate-100" />
                  <div className="h-2 w-1/3 rounded bg-slate-100" />
                </div>
              </div>
              <div className="h-4 w-3/4 rounded bg-slate-100 mb-3" />
              <div className="space-y-2">
                <div className="h-2.5 w-full rounded bg-slate-100" />
                <div className="h-2.5 w-5/6 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!jobs.length) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={18} className="text-violet-500" />
        <h2 className="font-bold text-slate-900 text-lg">AI Recommended For You</h2>
        <span className="text-xs bg-violet-100 text-violet-600 font-semibold px-2 py-0.5 rounded-full">AI Powered</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            onClick={() => navigate(`/description/${job._id}`)}
            className="group bg-white border border-slate-100 rounded-2xl p-5 cursor-pointer hover:border-violet-200 hover:shadow-xl hover:shadow-violet-50 transition-all duration-200 card-hover flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 rounded-xl border border-slate-100 bg-slate-50">
                <AvatarImage src={job?.company?.logo} />
              </Avatar>
              <div>
                <p className="text-xs font-semibold text-slate-700">{job?.company?.name}</p>
                <div className="flex items-center gap-1 text-slate-400 mt-0.5">
                  <MapPin size={10} />
                  <span className="text-xs">{job?.location || "Bangladesh"}</span>
                </div>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1 group-hover:text-violet-700 transition-colors">
              {job?.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 flex-1 mb-3">{job?.description}</p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-3 border-t border-slate-50">
              <span className="flex items-center gap-1"><Users size={11} /> {job?.position} open</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {daysAgo(job?.createdAt)}</span>
              <span className="ml-auto text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{job?.jobType}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;
