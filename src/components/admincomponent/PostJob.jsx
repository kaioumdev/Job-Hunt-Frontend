import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectTrigger, SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase, ArrowLeft } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "", description: "", requirements: "", salary: "",
    location: "", jobType: "", experience: "", position: 0, companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((s) => s.company);

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const selectCompany = (value) => {
    const c = companies.find((c) => c.name.toLowerCase() === value);
    setInput({ ...input, companyId: c._id });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) { toast.success(res.data.message); navigate("/admin/jobs"); }
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  const fields = [
    { name: "title", label: "Job Title", placeholder: "e.g. Senior React Developer", type: "text" },
    { name: "location", label: "Location", placeholder: "e.g. Dhaka, Remote", type: "text" },
    { name: "salary", label: "Salary", placeholder: "e.g. 50,000 - 80,000 BDT", type: "text" },
    { name: "position", label: "Openings", placeholder: "Number of positions", type: "number" },
    { name: "requirements", label: "Requirements", placeholder: "React, Node.js, MongoDB (comma separated)", type: "text" },
    { name: "experience", label: "Experience (years)", placeholder: "e.g. 3", type: "number" },
    { name: "jobType", label: "Job Type", placeholder: "Full-time / Remote / Internship", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={16} /> Back to jobs
        </button>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <Briefcase size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Post a New Job</h1>
                <p className="text-violet-200 text-sm">Fill in the details to publish your listing</p>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-6">
            {/* Description full width */}
            <div className="mb-5">
              <Label className="text-slate-700 font-semibold text-sm">Job Description</Label>
              <textarea
                name="description"
                value={input.description}
                onChange={onChange}
                placeholder="Describe the role, responsibilities and what you're looking for..."
                rows={3}
                className="mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {fields.map(({ name, label, placeholder, type }) => (
                <div key={name}>
                  <Label className="text-slate-700 font-semibold text-sm">{label}</Label>
                  <Input
                    type={type}
                    name={name}
                    value={input[name]}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="mt-1.5 bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-400"
                  />
                </div>
              ))}

              {/* Company select */}
              <div>
                <Label className="text-slate-700 font-semibold text-sm">Company</Label>
                <Select onValueChange={selectCompany}>
                  <SelectTrigger className="mt-1.5 bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((c) => (
                        <SelectItem key={c._id} value={c.name.toLowerCase()}>{c.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {companies.length === 0 && (
              <p className="text-sm text-red-500 font-medium mb-4">
                ⚠ Please register a company before posting a job.
              </p>
            )}

            <div className="flex gap-3 pt-4 border-t border-slate-50">
              <Button type="button" variant="outline" onClick={() => navigate("/admin/jobs")} className="flex-1">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || !input.companyId}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-500/20"
              >
                {loading ? <><Loader2 size={16} className="animate-spin mr-2" /> Posting...</> : "Post Job"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
