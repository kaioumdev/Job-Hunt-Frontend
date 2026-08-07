import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (!searchedQuery || (Array.isArray(searchedQuery) && searchedQuery.length === 0) || (typeof searchedQuery === "string" && !searchedQuery.trim())) {
      setFilterJobs(allJobs);
      return;
    }
    const queryArray = Array.isArray(searchedQuery) ? searchedQuery : [searchedQuery];
    setFilterJobs(
      allJobs.filter((job) =>
        queryArray.some((q) => {
          const lq = q.toLowerCase();
          return (
            job.title?.toLowerCase().includes(lq) ||
            job.description?.toLowerCase().includes(lq) ||
            job.location?.toLowerCase().includes(lq) ||
            job.salary?.toLowerCase().includes(lq)
          );
        })
      )
    );
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">All Jobs</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {filterJobs.length} {filterJobs.length === 1 ? "job" : "jobs"} found
            </p>
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="md:hidden flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:border-violet-300"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <FilterCard />
          </div>

          {/* Mobile filter drawer */}
          {showFilter && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/30" onClick={() => setShowFilter(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#f8f9fc] overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-900">Filters</h2>
                  <button onClick={() => setShowFilter(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                    <X size={18} className="text-slate-500" />
                  </button>
                </div>
                <FilterCard />
              </div>
            </div>
          )}

          {/* Jobs grid */}
          <div className="flex-1 min-w-0">
            {filterJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <p className="text-lg font-semibold mb-1">No jobs found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filterJobs.map((job, i) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="h-full"
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
