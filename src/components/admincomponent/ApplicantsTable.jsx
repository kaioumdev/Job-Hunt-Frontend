import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Link2, Calendar, CheckCircle, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const ApplicantsTable = () => {
  const { applicants } = useSelector((s) => s.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, { status });
      if (res.data.success) toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  if (!applicants?.applications?.length) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="font-semibold text-slate-500 mb-1">No applicants yet</p>
        <p className="text-sm">Applications will appear here once candidates apply</p>
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-100">
          {["Applicant", "Email", "Contact", "Resume", "Applied On", "Action"].map((h, i) => (
            <th key={h} className={`text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5 ${i === 5 ? "text-right" : ""}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {applicants.applications.map((item) => (
          <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-5 py-4">
              <p className="font-semibold text-slate-800">{item?.applicant?.fullname}</p>
            </td>
            <td className="px-5 py-4 text-slate-500 text-xs">{item?.applicant?.email}</td>
            <td className="px-5 py-4 text-slate-500 text-xs">{item?.applicant?.phoneNumber}</td>
            <td className="px-5 py-4">
              {item.applicant?.profile?.resume ? (
                <a
                  href={item.applicant.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-violet-600 hover:text-violet-700 text-xs font-medium"
                >
                  <Link2 size={12} /> View
                </a>
              ) : <span className="text-slate-300 text-xs">—</span>}
            </td>
            <td className="px-5 py-4">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar size={12} />
                <span className="text-xs">{item?.applicant?.createdAt?.split("T")[0]}</span>
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
                    onClick={() => statusHandler("Accepted", item._id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <CheckCircle size={13} /> Accept
                  </button>
                  <button
                    onClick={() => statusHandler("Rejected", item._id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <XCircle size={13} /> Reject
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

export default ApplicantsTable;
