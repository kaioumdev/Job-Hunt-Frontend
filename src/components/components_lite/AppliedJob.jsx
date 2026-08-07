import React from "react";
import { useSelector } from "react-redux";
import { CalendarDays, Building2, Briefcase } from "lucide-react";

const STATUS_STYLE = {
  accepted: "bg-green-50 text-green-700 border border-green-200",
  rejected: "bg-red-50 text-red-700 border border-red-200",
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
};

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((s) => s.job);

  if (!allAppliedJobs?.length) {
    return (
      <div className="text-center py-10 text-slate-400">
        <Briefcase size={28} className="mx-auto mb-3 opacity-40" />
        <p className="text-sm">You haven't applied to any jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {allAppliedJobs.map((item) => (
        <div key={item._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-violet-100 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white border border-slate-100 text-violet-500">
              <Briefcase size={15} />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{item.job?.title}</p>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                <Building2 size={11} /> {item.job?.company?.name}
                <CalendarDays size={11} className="ml-1" /> {item.createdAt?.split("T")[0]}
              </div>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize self-start sm:self-auto shrink-0 ${STATUS_STYLE[item.status] || STATUS_STYLE.pending}`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AppliedJob;
