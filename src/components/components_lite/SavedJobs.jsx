import React from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SavedJobs = () => {
  const { savedJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
            <Bookmark size={18} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Saved Jobs</h1>
            <p className="text-sm text-slate-500">{savedJobs?.length || 0} jobs saved</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {!savedJobs || savedJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="p-5 rounded-2xl bg-violet-50 text-violet-400 mb-5">
              <Bookmark size={32} />
            </div>
            <h2 className="text-lg font-bold text-slate-700 mb-2">No saved jobs yet</h2>
            <p className="text-slate-400 text-sm mb-6">Bookmark jobs you're interested in to find them here later</p>
            <button
              onClick={() => navigate("/Jobs")}
              className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedJobs.map((job, i) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
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

export default SavedJobs;
