import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setSearchedQuery(""));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <h1 className="text-xl font-bold text-slate-900">Browse Jobs</h1>
          <p className="text-sm text-slate-500 mt-0.5">{allJobs.length} results found</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {allJobs.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-semibold">No results found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs.map((job, i) => (
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
  );
};

export default Browse;
