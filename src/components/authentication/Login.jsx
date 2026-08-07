import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Code2, Loader2, Mail, Lock, User, Briefcase } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((s) => s.auth);

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      const data = error.response?.data;
      if (data?.needVerification) {
        toast.error(data.message);
        navigate("/verify-otp", { state: { email: input.email } });
        return;
      }
      toast.error(data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => { if (user) navigate("/"); }, []);

  return (
    <div className="min-h-screen bg-[#0f1117] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-[#0a0c12]">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-violet-600">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl">Dev<span className="text-violet-400">Hunt</span></span>
        </Link>
        <div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Your next tech role<br />starts here.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            Join thousands of developers finding jobs at top Bangladesh tech companies.
          </p>
        </div>
        <p className="text-slate-600 text-sm">© 2025 DevHunt Bangladesh</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#f8f9fc]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-violet-600">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-slate-900 font-bold text-lg">Dev<span className="text-violet-600">Hunt</span></span>
          </Link>

          <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome back</h1>
            <p className="text-slate-500 text-sm mb-7">Sign in to your account</p>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email" name="email" value={input.email} onChange={onChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <Link to="/forgot-password" className="text-xs text-violet-600 hover:text-violet-700 font-medium">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password" name="password" value={input.password} onChange={onChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Student", "Recruiter"].map((role) => (
                    <label
                      key={role}
                      className={`flex items-center gap-2.5 p-3 border-2 rounded-xl cursor-pointer transition-all text-sm font-medium ${
                        input.role === role
                          ? "border-violet-500 bg-violet-50 text-violet-700"
                          : "border-slate-200 text-slate-600 hover:border-violet-200"
                      }`}
                    >
                      <input type="radio" name="role" value={role} checked={input.role === role} onChange={onChange} className="sr-only" />
                      {role === "Student" ? <User size={15} /> : <Briefcase size={15} />}
                      {role}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-70 text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-violet-500/20 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-violet-600 hover:text-violet-700 font-semibold">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
