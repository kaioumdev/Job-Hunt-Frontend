import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";
import { Code2, Mail, Loader2, RefreshCw, ShieldCheck } from "lucide-react";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  if (!email) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm text-center max-w-sm w-full">
          <div className="p-3 rounded-xl bg-red-50 text-red-500 w-fit mx-auto mb-4">
            <Mail size={24} />
          </div>
          <p className="text-slate-600 mb-5 text-sm">No email found. Please register first.</p>
          <Link to="/register"
            className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
            Go to Register
          </Link>
        </div>
      </div>
    );
  }

  const verifyHandler = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) { toast.error("Please enter the 6-digit OTP"); return; }
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/verify-otp`,
        { email, otp },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally { setLoading(false); }
  };

  const resendHandler = async () => {
    try {
      setResending(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/resend-otp`,
        { email },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.data.success) toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not resend OTP");
    } finally { setResending(false); }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-violet-600">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-slate-900 font-bold text-xl">Dev<span className="text-violet-600">Hunt</span></span>
        </Link>

        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center">
                <ShieldCheck size={28} className="text-violet-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <Mail size={10} className="text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 text-center mb-1">Verify your email</h1>
          <p className="text-slate-500 text-sm text-center mb-7">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-slate-700">{email}</span>
          </p>

          <form onSubmit={verifyHandler}>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2 text-center">
                Enter verification code
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="• • • • • •"
                className="w-full text-center text-3xl font-bold tracking-[0.6em] border-2 border-slate-200 rounded-2xl py-4 px-4 bg-slate-50 focus:bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all text-slate-900 placeholder:text-slate-300 placeholder:tracking-[0.4em]"
              />
              <p className="text-xs text-slate-400 text-center mt-2">
                {otp.length}/6 digits entered
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-6">
              {[0,1,2,3,4,5].map((i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < otp.length ? "bg-violet-500" : "bg-slate-200"}`} />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className={`w-full font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md ${
                otp.length === 6
                  ? "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-500/20"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : "Verify Email"}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-slate-50 text-center">
            <p className="text-slate-500 text-sm mb-2">Didn't receive the code?</p>
            <button
              type="button"
              onClick={resendHandler}
              disabled={resending}
              className="flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-semibold text-sm mx-auto disabled:opacity-50 transition-colors"
            >
              <RefreshCw size={13} className={resending ? "animate-spin" : ""} />
              {resending ? "Sending..." : "Resend code"}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-5">
          Wrong email?{" "}
          <Link to="/register" className="text-violet-600 hover:text-violet-700 font-semibold">
            Go back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
