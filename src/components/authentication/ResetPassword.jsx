import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { Code2, Loader2, Mail, Lock, KeyRound, ArrowLeft, RefreshCw } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const presetEmail = location.state?.email;
  const fromProfile = location.state?.fromProfile;

  const [step, setStep] = useState(presetEmail ? 2 : 1);
  const [email, setEmail] = useState(presetEmail || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async (targetEmail) => {
    setLoading(true);
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/forgot-password`,
        { email: targetEmail },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.data.success) { toast.success(res.data.message); setStep(2); }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not send OTP");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (fromProfile && presetEmail) sendOtp(presetEmail);
  }, []);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }
    sendOtp(email);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) { toast.error("Please enter the 6-digit OTP"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    setLoading(true);
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/reset-password`,
        { email, otp, newPassword },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.data.success) { toast.success(res.data.message); navigate("/login"); }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not reset password");
    } finally { setLoading(false); }
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
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center">
              <KeyRound size={24} className="text-violet-600" />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 text-center mb-1">
            {fromProfile ? "Change Password" : "Reset Password"}
          </h1>
          <p className="text-slate-500 text-sm text-center mb-7">
            {step === 1
              ? "Enter your email and we'll send you a verification code"
              : `Enter the code sent to ${email}`}
          </p>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {["Send OTP", "New Password"].map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${i + 1 <= step ? "text-violet-600" : "text-slate-400"}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${i + 1 <= step ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                    {i + 1}
                  </span>
                  {s}
                </div>
                {i === 0 && <div className={`flex-1 h-px ${step >= 2 ? "bg-violet-300" : "bg-slate-100"}`} />}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={step === 1 ? handleSendOtp : handleReset} className="space-y-4">
            {step === 1 ? (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Verification Code</label>
                  <input
                    type="text" inputMode="numeric" maxLength={6}
                    value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="• • • • • •"
                    className="w-full text-center text-2xl font-bold tracking-[0.5em] border-2 border-slate-200 rounded-xl py-3 bg-slate-50 focus:bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all placeholder:text-slate-300 placeholder:tracking-[0.3em]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-70 text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-violet-500/20 flex items-center justify-center gap-2 text-sm"
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Please wait...</>
                : step === 1 ? "Send Code" : "Set New Password"}
            </button>
          </form>

          {step === 2 && (
            <div className="mt-4 text-center">
              <button
                type="button" onClick={() => sendOtp(email)} disabled={loading}
                className="flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-semibold text-sm mx-auto disabled:opacity-50"
              >
                <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                Resend code
              </button>
            </div>
          )}

          <div className="mt-5 pt-5 border-t border-slate-50 text-center">
            <Link to="/login" className="flex items-center justify-center gap-1.5 text-slate-500 hover:text-violet-600 text-sm font-medium transition-colors">
              <ArrowLeft size={14} /> Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
