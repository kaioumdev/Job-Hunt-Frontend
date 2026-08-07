import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Code2, Loader2, Mail, Lock, Phone, User, Briefcase, Upload } from "lucide-react";

const Register = () => {
  const [input, setInput] = useState({ fullname: "", email: "", password: "", role: "", phoneNumber: "", file: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsAcceptedAt, setTermsAcceptedAt] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((s) => s.auth);

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const onFile = (e) => setInput({ ...input, file: e.target.files?.[0] });
  const onTerms = (e) => {
    setTermsAccepted(e.target.checked);
    setTermsAcceptedAt(e.target.checked ? new Date().toISOString() : null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) { toast.error("You must accept the Terms and Conditions."); return; }
    const formData = new FormData();
    Object.entries(input).forEach(([k, v]) => { if (v) formData.append(k === "file" ? "file" : k, v); });
    if (termsAcceptedAt) formData.append("termsAcceptedAt", termsAcceptedAt);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/verify-otp", { state: { email: input.email } });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => { if (user) navigate("/"); }, []);

  const fields = [
    { name: "fullname", label: "Full Name", placeholder: "John Doe", type: "text", icon: <User size={15} /> },
    { name: "email", label: "Email Address", placeholder: "you@example.com", type: "email", icon: <Mail size={15} /> },
    { name: "password", label: "Password", placeholder: "Min 6 characters", type: "password", icon: <Lock size={15} /> },
    { name: "phoneNumber", label: "Phone Number", placeholder: "01XXXXXXXXX", type: "tel", icon: <Phone size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-violet-600">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-slate-900 font-bold text-xl">Dev<span className="text-violet-600">Hunt</span></span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1">Join Bangladesh's top developer job marketplace</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm">
          <form onSubmit={onSubmit}>
            {/* Fields grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {fields.map(({ name, label, placeholder, type, icon }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
                    <input
                      type={type} name={name} value={input[name]} onChange={onChange}
                      placeholder={placeholder}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Role + Photo row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">I am a</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Student", "Recruiter"].map((role) => (
                    <label
                      key={role}
                      className={`flex items-center gap-2 p-2.5 border-2 rounded-xl cursor-pointer transition-all text-sm font-medium ${
                        input.role === role ? "border-violet-500 bg-violet-50 text-violet-700" : "border-slate-200 text-slate-600 hover:border-violet-200"
                      }`}
                    >
                      <input type="radio" name="role" value={role} checked={input.role === role} onChange={onChange} className="sr-only" />
                      {role === "Student" ? <User size={14} /> : <Briefcase size={14} />}
                      {role}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Profile Photo <span className="font-normal text-slate-400">(optional)</span></label>
                <label className="flex items-center gap-2 p-2.5 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all text-sm text-slate-500">
                  <Upload size={15} className="text-violet-500" />
                  {input.file ? input.file.name : "Upload photo"}
                  <input type="file" accept="image/*" onChange={onFile} className="sr-only" />
                </label>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl mb-6">
              <input
                type="checkbox" id="terms" checked={termsAccepted} onChange={onTerms}
                className="mt-0.5 w-4 h-4 accent-violet-600 cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                I agree to the{" "}
                <Link to="/terms" target="_blank" className="text-violet-600 font-semibold hover:underline">Terms and Conditions</Link>
                {" "}and{" "}
                <Link to="/PrivacyPolicy" target="_blank" className="text-violet-600 font-semibold hover:underline">Privacy Policy</Link>
                . My acceptance timestamp will be securely recorded.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !termsAccepted}
              className={`w-full font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md ${
                !termsAccepted ? "bg-slate-200 text-slate-400 cursor-not-allowed" :
                "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-500/20"
              }`}
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Creating account...</> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-600 hover:text-violet-700 font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
