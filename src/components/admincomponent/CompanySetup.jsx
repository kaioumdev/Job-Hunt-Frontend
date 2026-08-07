import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import { Button } from "../ui/button.jsx";
import { ArrowLeft, Loader2, Building2, Globe, MapPin, Upload } from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById.jsx";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({ name: "", description: "", website: "", location: "", file: null });
  const { singleCompany } = useSelector((s) => s.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const onFile = (e) => setInput({ ...input, file: e.target.files?.[0] });

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(input).forEach(([k, v]) => { if (v && k !== "file") formData.append(k, v); });
    if (input.file) formData.append("file", input.file);
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.status === 200 && res.data.message) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  const fields = [
    { name: "name", label: "Company Name", placeholder: "e.g. Brain Station 23", icon: <Building2 size={14} /> },
    { name: "website", label: "Website URL", placeholder: "https://yourcompany.com", icon: <Globe size={14} /> },
    { name: "location", label: "Location", placeholder: "e.g. Dhaka", icon: <MapPin size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <button onClick={() => navigate("/admin/companies")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 mb-6 transition-colors font-medium">
          <ArrowLeft size={16} /> Back to companies
        </button>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <Building2 size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Company Setup</h1>
                <p className="text-violet-200 text-sm">Update your company information</p>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-4">
            {fields.map(({ name, label, placeholder, icon }) => (
              <div key={name}>
                <Label className="text-sm font-semibold text-slate-700 mb-1.5 block">{label}</Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
                  <Input
                    type="text" name={name} value={input[name]} onChange={onChange}
                    placeholder={placeholder}
                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-400"
                  />
                </div>
              </div>
            ))}

            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-1.5 block">Description</Label>
              <textarea
                name="description" value={input.description} onChange={onChange}
                placeholder="Brief description of your company..."
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 resize-none transition-all"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-1.5 block">Company Logo</Label>
              <label className="flex items-center gap-2 p-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all text-sm text-slate-500">
                <Upload size={15} className="text-violet-500" />
                {input.file ? input.file.name : "Click to upload logo"}
                <input type="file" accept="image/*" onChange={onFile} className="sr-only" />
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-50">
              <Button type="button" variant="outline" onClick={() => navigate("/admin/companies")} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 bg-violet-600 hover:bg-violet-500 shadow-md shadow-violet-500/20">
                {loading ? <><Loader2 size={16} className="animate-spin mr-2" /> Saving...</> : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;
