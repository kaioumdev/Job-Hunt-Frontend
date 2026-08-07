import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const jobs = useSelector((state) => state.jobs?.allJobs || []);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") navigate("/admin/companies");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />
      <Header />
      <div className="flex-1">
        <Categories />
        <LatestJobs jobs={jobs} loading={loading} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
