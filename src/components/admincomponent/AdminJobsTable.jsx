import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Building2, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((s) => s.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    setFilterJobs(
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        const q = searchJobByText.toLowerCase();
        return job.title?.toLowerCase().includes(q) || job?.company?.name?.toLowerCase().includes(q);
      })
    );
  }, [allAdminJobs, searchJobByText]);

  if (!filterJobs.length) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="font-semibold text-slate-500 mb-1">No jobs posted yet</p>
        <p className="text-sm">Click "Post New Job" to create your first listing</p>
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-100">
          <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Company</th>
          <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Role</th>
          <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Location</th>
          <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Posted</th>
          <th className="text-right text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {filterJobs.map((job) => (
          <tr key={job._id} className="hover:bg-slate-50/50 transition-colors group">
            <td className="px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-violet-50 text-violet-500">
                  <Building2 size={13} />
                </div>
                <span className="font-semibold text-slate-800 text-sm">{job?.company?.name}</span>
              </div>
            </td>
            <td className="px-5 py-4">
              <span className="font-medium text-slate-700">{job.title}</span>
            </td>
            <td className="px-5 py-4">
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                {job.location || "—"}
              </span>
            </td>
            <td className="px-5 py-4">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar size={12} />
                <span className="text-xs">{job.createdAt?.split("T")[0]}</span>
              </div>
            </td>
            <td className="px-5 py-4 text-right">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1.5" align="end">
                  <button
                    onClick={() => navigate(`/admin/companies/${job._id}`)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={13} /> Edit Job
                  </button>
                  <button
                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Eye size={13} /> View Applicants
                  </button>
                </PopoverContent>
              </Popover>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminJobsTable;
