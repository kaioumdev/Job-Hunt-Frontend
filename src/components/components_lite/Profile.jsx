import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Mail, Phone, Link2, Pen, ShieldCheck } from "lucide-react";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const isResume = !!user?.profile?.resume;

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-5">
        {/* Profile card */}
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-violet-600 to-purple-500" />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-12 mb-4">
              <Avatar className="h-20 w-20 ring-4 ring-white rounded-2xl">
                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
              </Avatar>
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:border-violet-300 hover:text-violet-600 px-4 py-2 rounded-xl transition-colors shadow-sm"
              >
                <Pen size={14} /> Edit Profile
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-xl font-extrabold text-slate-900">{user?.fullname}</h1>
                <p className="text-slate-500 text-sm mt-1 max-w-md">{user?.profile?.bio || "No bio yet"}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-xs bg-violet-100 text-violet-700 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck size={11} /> {user?.role}
                  </span>
                  {user?.isVerified && (
                    <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">Verified</span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="grid sm:grid-cols-2 gap-3 mt-5 pt-5 border-t border-slate-50">
              <a href={`mailto:${user?.email}`} className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-violet-600 transition-colors">
                <div className="p-2 rounded-lg bg-slate-50 text-slate-500"><Mail size={14} /></div>
                <span className="truncate">{user?.email}</span>
              </a>
              <a href={`tel:${user?.phoneNumber}`} className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-violet-600 transition-colors">
                <div className="p-2 rounded-lg bg-slate-50 text-slate-500"><Phone size={14} /></div>
                <span>{user?.phoneNumber}</span>
              </a>
              {isResume && (
                <a href={user.profile.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-violet-600 hover:text-violet-700 transition-colors col-span-2">
                  <div className="p-2 rounded-lg bg-violet-50 text-violet-600"><Link2 size={14} /></div>
                  <span className="underline underline-offset-2">View Resume / Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">Skills</h2>
          {user?.profile?.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.map((skill, i) => (
                <span key={i} className="text-sm bg-violet-50 text-violet-700 border border-violet-100 px-3 py-1.5 rounded-xl font-medium">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No skills added yet. Edit your profile to add skills.</p>
          )}
        </div>

        {/* Applied jobs */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-5">Applied Jobs</h2>
          <AppliedJob />
        </div>
      </div>
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
