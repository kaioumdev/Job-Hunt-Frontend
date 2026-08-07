import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";
import { Plus, Search, Building2 } from "lucide-react";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => { dispatch(setSearchCompanyByText(input)); }, [input]);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600">
              <Building2 size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Companies</h1>
              <p className="text-sm text-slate-500 mt-0.5">Manage your registered companies</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2 shadow-md shadow-violet-500/20"
          >
            <Plus size={16} /> Add Company
          </Button>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50">
            <div className="relative max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search companies..."
                className="pl-9 bg-slate-50 border-slate-100 focus:bg-white"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <CompaniesTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
