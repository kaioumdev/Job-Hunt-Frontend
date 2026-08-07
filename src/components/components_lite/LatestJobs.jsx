import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LatestJobs = ({ loading }) => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Latest <span className="text-violet-600">Openings</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Fresh opportunities posted recently</p>
        </div>
        <button
          onClick={() => navigate("/Jobs")}
          className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
        >
          View all jobs <ArrowRight size={15} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-11 w-11 rounded-xl bg-slate-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 rounded bg-slate-100" />
                    <div className="h-2.5 w-1/3 rounded bg-slate-100" />
                  </div>
                </div>
                <div className="h-4 w-3/4 rounded bg-slate-100 mb-3" />
                <div className="space-y-2 mb-4">
                  <div className="h-2.5 w-full rounded bg-slate-100" />
                  <div className="h-2.5 w-5/6 rounded bg-slate-100" />
                </div>
                <div className="flex gap-2 pt-3 border-t border-slate-50">
                  <div className="h-4 w-20 rounded bg-slate-100" />
                  <div className="h-4 w-14 rounded bg-slate-100" />
                </div>
              </div>
            ))
          : allJobs.length === 0
          ? (
            <div className="col-span-3 text-center py-16 text-slate-400">
              <p className="text-lg font-medium">No jobs available yet</p>
            </div>
          )
          : allJobs.slice(0, 6).map((job) =>
              job?._id ? <JobCards key={job._id} job={job} /> : null
            )}
      </div>

      <div className="mt-8 text-center md:hidden">
        <button
          onClick={() => navigate("/Jobs")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 border border-violet-200 px-5 py-2.5 rounded-xl hover:bg-violet-50 transition-colors"
        >
          View all jobs <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
};

export default LatestJobs;
