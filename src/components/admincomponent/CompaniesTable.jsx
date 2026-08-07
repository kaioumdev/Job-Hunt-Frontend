import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Globe, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((s) => s.company);
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState(companies);

  useEffect(() => {
    setFiltered(
      companies.filter((c) => {
        if (!searchCompanyByText) return true;
        return c.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      })
    );
  }, [companies, searchCompanyByText]);

  if (!filtered.length) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="font-semibold text-slate-500 mb-1">No companies yet</p>
        <p className="text-sm">Add your first company to start posting jobs</p>
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-100">
          <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Company</th>
          <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Location</th>
          <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Website</th>
          <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Added</th>
          <th className="text-right text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {filtered.map((company) => (
          <tr key={company._id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 rounded-xl border border-slate-100 bg-slate-50">
                  <AvatarImage src={company.logo} alt={company.name} />
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-800">{company.name}</p>
                  <p className="text-xs text-slate-400 line-clamp-1 max-w-[200px]">{company.description || "—"}</p>
                </div>
              </div>
            </td>
            <td className="px-5 py-4">
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                {company.location || "—"}
              </span>
            </td>
            <td className="px-5 py-4">
              {company.website ? (
                <a href={company.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-violet-600 hover:text-violet-700 text-xs font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Globe size={12} /> Visit
                </a>
              ) : <span className="text-slate-400 text-xs">—</span>}
            </td>
            <td className="px-5 py-4">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar size={12} />
                <span className="text-xs">{company.createdAt?.split("T")[0]}</span>
              </div>
            </td>
            <td className="px-5 py-4 text-right">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-36 p-1.5" align="end">
                  <button
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={13} /> Edit Company
                  </button>
                </PopoverContent>
              </Popover>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompaniesTable;
