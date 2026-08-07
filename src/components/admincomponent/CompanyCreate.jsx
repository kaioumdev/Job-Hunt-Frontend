import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useNavigate } from "react-router-dom";
import { Building2, ArrowLeft, Loader2 } from "lucide-react";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    if (!companyName.trim()) return;
    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create company");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 md:px-8 py-8">
        <button onClick={() => navigate("/admin/companies")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 mb-6 transition-colors font-medium">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <Building2 size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">New Company</h1>
                <p className="text-violet-200 text-sm">Register a company to post jobs</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name</label>
            <input
              type="text"
              placeholder="e.g. Brain Station 23, Chaldal..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && registerNewCompany()}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all mb-1.5"
            />
            <p className="text-xs text-slate-400 mb-6">This name will be visible to all job seekers.</p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/companies")}
                className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-50 text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={registerNewCompany}
                disabled={!companyName.trim() || loading}
                className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-md shadow-violet-500/20 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={15} className="animate-spin" /> Creating...</> : "Create & Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
