import React, { useState } from "react";
import Title from "../common/Title";

const Step4 = () => {
  const [formData, setFormData] = useState({
    institute_name: "",
    degree: "",
    start_date: "",
    end_date: "",
    currently_enrolled: false,
  });

  const [educationList, setEducationList] = useState([]);

  const handleAddEducation = () => {
    if (!formData.institute_name || !formData.degree || !formData.start_date) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEducation = {
      ...formData,
      end_date: formData.currently_enrolled ? null : formData.end_date,
    };

    setEducationList([...educationList, newEducation]);

    // Reset form
    setFormData({
      institute_name: "",
      degree: "",
      start_date: "",
      end_date: "",
      currently_enrolled: false,
    });
  };

  const handleDeleteEducation = (index) => {
    const updatedList = [...educationList];
    updatedList.splice(index, 1);
    setEducationList(updatedList);
  };

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40">Education Information</Title>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Institute Name *</label>
            <input
              type="text"
              className="bg-[#0E0E10] px-3 py-2 rounded-lg border border-[#262626] text-white text-sm"
              value={formData.institute_name}
              onChange={(e) =>
                setFormData({ ...formData, institute_name: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Degree *</label>
            <input
              type="text"
              className="bg-[#0E0E10] px-3 py-2 rounded-lg border border-[#262626] text-white text-sm"
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Start Date *</label>
            <input
              type="date"
              className="bg-[#0E0E10] px-3 py-2 rounded-lg border border-[#262626] text-white text-sm"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">End Date</label>
            <input
              type="date"
              className="bg-[#0E0E10] px-3 py-2 rounded-lg border border-[#262626] text-white text-sm"
              value={formData.end_date}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
              disabled={formData.currently_enrolled}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.currently_enrolled}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currently_enrolled: e.target.checked,
                  end_date: "",
                })
              }
            />
            <label className="text-sm">I am currently studying here</label>
          </div>

          <button
            type="button"
            onClick={handleAddEducation}
            className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
          >
            Add Education
          </button>
        </div>

        {/* List Display */}
        {educationList.length > 0 && (
          <div className="mt-8">
            <Title level="title24">Your Educations</Title>
            <ul className="mt-4 space-y-4">
              {educationList.map((item, index) => (
                <li
                  key={index}
                  className="bg-[#1A1A1C] p-4 rounded-lg border border-[#333]"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {item.institute_name} - {item.degree}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {item.start_date} —{" "}
                        {item.currently_enrolled
                          ? "Present"
                          : item.end_date || "N/A"}
                      </p>
                    </div>
                    <button
                      className="text-red-500 hover:underline text-xs"
                      onClick={() => handleDeleteEducation(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step4;
