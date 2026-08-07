import React from "react";
import { Link } from "react-router-dom";
import { Code2, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f1117] border-t border-white/[0.06] mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-violet-600">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Dev<span className="text-violet-400">Hunt</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Bangladesh's leading developer job marketplace. Connecting tech talent with top companies across the country.
            </p>
          </div>

          {/* Job seekers */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">For Developers</h4>
            <ul className="space-y-2.5">
              {[["Browse Jobs", "/Browse"], ["Latest Openings", "/Jobs"], ["Saved Jobs", "/saved-jobs"], ["Your Profile", "/Profile"]].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-slate-400 hover:text-violet-300 text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[["Privacy Policy", "/PrivacyPolicy"], ["Terms of Service", "/TermsofService"]].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-slate-400 hover:text-violet-300 text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2025 DevHunt Bangladesh. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="text-slate-500 hover:text-violet-400 transition-colors p-1.5 rounded-lg hover:bg-white/[0.05]">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
