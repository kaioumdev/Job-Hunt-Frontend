import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";
import { ArrowLeft, Users } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applicants } = useSelector((s) => s.application);

  useEffect(() => {
    axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, { withCredentials: true })
      .then((res) => dispatch(setAllApplicants(res.data.job)))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 mb-6 transition-colors font-medium">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600">
            <Users size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Applicants</h1>
            <p className="text-sm text-slate-500">{applicants?.applications?.length || 0} total applicants</p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <ApplicantsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
