import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { MapPin, Code2, Star, DollarSign, RotateCcw } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    icon: <MapPin size={14} />,
    array: ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Jashore", "Shylet", "Rangpur", "Remote"],
  },
  {
    filterType: "Technology",
    icon: <Code2 size={14} />,
    array: ["Mern", "React", "Node", "Python", "Java", "Full Stack", "Data Scientist", "Frontend", "Backend", "Mobile", "DevOps"],
  },
  {
    filterType: "Experience",
    icon: <Star size={14} />,
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    icon: <DollarSign size={14} />,
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  const toggle = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const reset = () => setSelected([]);

  useEffect(() => {
    dispatch(setSearchedQuery(selected));
  }, [selected, dispatch]);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 sticky top-20">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-slate-900 text-base">Filters</h2>
        {selected.length > 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium"
          >
            <RotateCcw size={12} /> Reset ({selected.length})
          </button>
        )}
      </div>

      <div className="space-y-6">
        {filterData.map((section) => (
          <div key={section.filterType}>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {section.icon}
              {section.filterType}
            </div>
            <div className="space-y-1.5">
              {section.array.map((item) => {
                const id = `filter-${section.filterType}-${item}`;
                const isChecked = selected.includes(item);
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-colors text-sm ${
                      isChecked
                        ? "bg-violet-50 text-violet-700 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={id}
                      value={item}
                      checked={isChecked}
                      onChange={() => toggle(item)}
                      className="w-3.5 h-3.5 accent-violet-600 cursor-pointer rounded"
                    />
                    {item}
                    {isChecked && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
