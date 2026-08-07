import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Clock, DollarSign, Briefcase, Users, CalendarDays, CheckCircle2, Building2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import RecommendedJobs from "./RecommendedJobs";

const Description = () => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const { singleJob } = useSelector((s) => s.job);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const isApplied = singleJob?.applications?.some(
    (a) => a.applicant === user?._id
  ) || false;
  const [applied, setApplied] = useState(isApplied);

  const applyHandler = async () => {
    if (!user) { toast.error("Please login to apply"); navigate("/login"); return; }
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setApplied(true);
        dispatch(setSingleJob({ ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }));
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setApplied(res.data.job.applications?.some((a) => a.applicant === user?._id));
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetch();
  }, [jobId, dispatch, user?._id]);

  if (loading || !singleJob) {
    return (
      <div className="min-h-screen bg-[#f8f9fc]">
        <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
          <div className="h-8 w-32 bg-slate-200 rounded-lg mb-6" />
          <div className="bg-white rounded-2xl p-8 mb-6">
            <div className="h-7 w-2/3 bg-slate-200 rounded mb-4" />
            <div className="flex gap-3">
              {[1,2,3,4].map(n => <div key={n} className="h-7 w-24 bg-slate-100 rounded-full" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const meta = [
    { icon: <MapPin size={15} />, label: "Location", value: singleJob.location },
    { icon: <DollarSign size={15} />, label: "Salary", value: singleJob.salary },
    { icon: <Briefcase size={15} />, label: "Experience", value: `${singleJob.experienceLevel} ${singleJob.experienceLevel === 1 ? "year" : "years"}` },
    { icon: <Users size={15} />, label: "Openings", value: `${singleJob.position} ${singleJob.position === 1 ? "position" : "positions"}` },
    { icon: <Clock size={15} />, label: "Job Type", value: singleJob.jobType },
    { icon: <Users size={15} />, label: "Applicants", value: singleJob.applications?.length || 0 },
    { icon: <CalendarDays size={15} />, label: "Posted", value: singleJob.createdAt?.split("T")[0] },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-violet-600 text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to jobs
        </button>

        {/* Hero card */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 mb-5 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-2xl border border-slate-100 bg-slate-50">
                <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} />
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Building2 size={13} className="text-slate-400" />
                  <span className="text-sm text-slate-500 font-medium">{singleJob?.company?.name}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">{singleJob.title}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-violet-50 text-violet-700 border border-violet-100 px-2.5 py-1 rounded-full font-semibold">
                    {singleJob.jobType}
                  </span>
                  <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 px-2.5 py-1 rounded-full font-medium">
                    <MapPin size={10} className="inline mr-1" />{singleJob.location}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={applied ? undefined : applyHandler}
              disabled={applied}
              className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
                applied
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30"
              }`}
            >
              {applied ? (
                <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Applied</span>
              ) : "Apply Now"}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Main content */}
          <div className="md:col-span-2 space-y-5">
            {/* Description */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-slate-900 text-base mb-3">About this Role</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{singleJob.description}</p>
            </div>

            {/* Requirements */}
            {singleJob.requirements?.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-slate-900 text-base mb-4">Requirements</h2>
                <div className="flex flex-wrap gap-2">
                  {singleJob.requirements.map((req, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-sm bg-slate-50 border border-slate-100 text-slate-700 px-3 py-1.5 rounded-xl font-medium">
                      <CheckCircle2 size={13} className="text-violet-500" />
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-slate-900 text-base mb-4">Job Details</h2>
              <div className="space-y-3.5">
                {meta.map((m) => (
                  <div key={m.label} className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-violet-50 text-violet-600 shrink-0">
                      {m.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{m.label}</p>
                      <p className="text-sm font-semibold text-slate-800">{m.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply CTA */}
            {!applied && (
              <button
                onClick={applyHandler}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-violet-500/20 text-sm"
              >
                Apply for this Position
              </button>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <RecommendedJobs jobId={jobId} />
      </div>
    </div>
  );
};

export default Description;
