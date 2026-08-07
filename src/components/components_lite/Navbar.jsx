import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X, Bookmark, Briefcase, Code2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { savedJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors relative pb-0.5 ${
      isActive(path)
        ? "text-violet-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-violet-400 after:rounded-full"
        : "text-slate-300 hover:text-white"
    }`;

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {}, { withCredentials: true });
      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <nav className="bg-[#0f1117] border-b border-white/[0.06] sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-violet-600">
            <Code2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Dev<span className="text-violet-400">Hunt</span>
          </span>
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {user?.role === "Recruiter" ? (
              <>
                <li><Link to="/admin/companies" className={navLinkClass("/admin/companies")}>Companies</Link></li>
                <li><Link to="/admin/jobs" className={navLinkClass("/admin/jobs")}>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className={navLinkClass("/")}>Home</Link></li>
                <li><Link to="/Browse" className={navLinkClass("/Browse")}>Browse</Link></li>
                <li><Link to="/Jobs" className={navLinkClass("/Jobs")}>Jobs</Link></li>
                <li>
                  <Link to="/saved-jobs" className={`${navLinkClass("/saved-jobs")} flex items-center gap-1.5`}>
                    <Bookmark size={14} />
                    Saved
                    {savedJobs?.length > 0 && (
                      <span className="bg-violet-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                        {savedJobs.length}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/[0.08]">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-white/[0.06] transition-colors">
                  <Avatar className="h-8 w-8 ring-2 ring-violet-500/40">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0 bg-[#1a1d27] border-white/[0.08] text-white shadow-2xl" align="end">
                <div className="p-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-violet-500/30">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-white truncate">{user?.fullname}</p>
                      <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                      <span className="inline-flex items-center mt-1 text-xs font-medium text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
                        {user?.role}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  {user?.role === "Student" && (
                    <Link
                      to="/Profile"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <User2 size={16} />
                      My Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/[0.06] transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0f1117] border-t border-white/[0.06] px-4 py-4">
          <ul className="flex flex-col gap-1 mb-4">
            {user?.role === "Recruiter" ? (
              <>
                <li><Link to="/admin/companies" onClick={() => setIsMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-medium">Companies</Link></li>
                <li><Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-medium">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-medium">Home</Link></li>
                <li><Link to="/Browse" onClick={() => setIsMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-medium">Browse</Link></li>
                <li><Link to="/Jobs" onClick={() => setIsMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-medium">Jobs</Link></li>
                <li>
                  <Link to="/saved-jobs" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-medium">
                    <Bookmark size={15} /> Saved Jobs
                    {savedJobs?.length > 0 && (
                      <span className="bg-violet-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{savedJobs.length}</span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="border-t border-white/[0.06] pt-4">
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-white/20 text-slate-300 hover:bg-white/[0.06]">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-violet-600 hover:bg-violet-500">Get Started</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] mb-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">{user?.fullname}</p>
                    <p className="text-xs text-slate-400">{user?.role}</p>
                  </div>
                </div>
                {user?.role === "Student" && (
                  <Link to="/Profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/[0.06] text-sm">
                    <User2 size={16} /> Profile
                  </Link>
                )}
                <button onClick={() => { logoutHandler(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/[0.06] text-sm">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
