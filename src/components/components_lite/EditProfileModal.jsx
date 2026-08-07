import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2, KeyRound, User, Mail, Phone, FileText, Sparkles, X } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    resume: user?.profile?.resume || "",
  });

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(input).forEach(([k, v]) => { if (v !== undefined) formData.append(k, v); });
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser({ ...res.data.user, skills: input.skills }));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally { setLoading(false); }
  };

  const fields = [
    { name: "fullname", label: "Full Name", type: "text", placeholder: "John Doe", icon: <User size={14} /> },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com", icon: <Mail size={14} /> },
    { name: "phoneNumber", label: "Phone", type: "tel", placeholder: "01XXXXXXXXX", icon: <Phone size={14} /> },
  ];

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[520px] w-[95vw] rounded-2xl p-0 overflow-hidden border-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={() => setOpen(false)}
        aria-describedby={undefined}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-5 flex items-center justify-between">
          <div>
            <DialogTitle className="text-white font-bold text-lg">Edit Profile</DialogTitle>
            <p className="text-violet-200 text-xs mt-0.5">Update your personal information</p>
          </div>
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {/* Basic fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ name, label, type, placeholder, icon }) => (
              <div key={name}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
                  <input
                    type={type} name={name} value={input[name]} onChange={onChange}
                    placeholder={placeholder}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
                  />
                </div>
              </div>
            ))}

            {/* Bio spans 2 cols */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bio</label>
              <textarea
                name="bio" value={input.bio} onChange={onChange}
                placeholder="A short bio about yourself..."
                rows={2}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all resize-none"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              <Sparkles size={12} className="text-violet-500" /> Skills
            </label>
            <input
              name="skills" value={input.skills} onChange={onChange}
              placeholder="React, Node.js, Python, SQL..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
            />
            <p className="text-xs text-slate-400 mt-1">Separate skills with commas</p>
          </div>

          {/* Resume */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              <FileText size={12} /> Resume / Portfolio Link
            </label>
            <input
              type="url" name="resume" value={input.resume}
              onChange={(e) => setInput({ ...input, resume: e.target.value })}
              placeholder="https://github.com/yourname or https://drive.google.com/..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button" onClick={() => setOpen(false)}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-50 text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit" disabled={loading}
              className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-70 text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-md shadow-violet-500/20 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Change password */}
        <div className="px-6 pb-6 pt-0">
          <div className="border-t border-slate-50 pt-4">
            <button
              type="button"
              onClick={() => { setOpen(false); navigate("/forgot-password", { state: { email: user?.email, fromProfile: true } }); }}
              className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600 font-semibold py-2.5 rounded-xl text-sm transition-all"
            >
              <KeyRound size={14} /> Change Password
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
