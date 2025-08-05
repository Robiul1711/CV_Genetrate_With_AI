import React, { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";

const Step4 = () => {
  const {
    register,
    setValue,
    getValues,
    resetField,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    name: "education",
  });

  const [formData, setFormData] = useState({
    institute: "",
    degree: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (!formData.institute || !formData.degree || !formData.startDate) return;

    if (editIndex !== null) {
      update(editIndex, formData);
      setEditIndex(null);
    } else {
      append(formData);
    }

    setFormData({
      institute: "",
      degree: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    });
  };

  const handleEdit = (index) => {
    const item = getValues(`education.${index}`);
    setFormData(item);
    setEditIndex(index);
  };

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-full max-w-[800px] mx-auto">
        {/* Header Section */}
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">Add Your Education</Title>
          <Title level="title14">
            Share your academic background — including schools, degrees, and graduation dates.
          </Title>
        </div>
        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">Add Your Education</Title>
          <Title level="title20">
            Share your academic background — including schools, degrees, and graduation dates.
          </Title>
        </div>

        {/* Education List */}
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-4 p-4 rounded-lg border border-[#262626] bg-[#0E0E10]"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Title level="title32" className="text-sm sm:text-base">
                  {item.degree}
                </Title>
                <GoDotFill className="text-[#fff] text-xl" />
                <Title level="title32" className="text-sm sm:text-base">
                  {item.institute}
                </Title>
              </div>
              <Title level="title24">
                {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
              </Title>
            </div>
            <div className="flex items-center gap-2">
              <CiEdit
                size={28}
                onClick={() => handleEdit(index)}
                className="text-white cursor-pointer p-1 border border-white/30 rounded-full"
              />
              <button
                onClick={() => remove(index)}
                className="text-red-500 text-sm px-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Education Form */}
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Name Of Institute *</label>
            <input
              type="text"
              placeholder="Polytechnic Institute"
              className="bg-[#0E0E10] px-3 py-2 text-sm rounded-lg border border-[#262626] text-white"
              value={formData.institute}
              onChange={(e) =>
                setFormData({ ...formData, institute: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Degree *</label>
            <input
              type="text"
              placeholder="Diploma"
              className="bg-[#0E0E10] px-3 py-2 text-sm rounded-lg border border-[#262626] text-white"
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Start Date *</label>
              <input
                type="date"
                className="bg-[#0E0E10] px-3 py-2 text-sm rounded-lg border border-[#262626] text-white"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">End Date</label>
              <input
                type="date"
                disabled={formData.isCurrent}
                className="bg-[#0E0E10] px-3 py-2 text-sm rounded-lg border border-[#262626] text-white"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              checked={formData.isCurrent}
              onChange={(e) =>
                setFormData({ ...formData, isCurrent: e.target.checked })
              }
            />
            <p className="text-xs">Currently Enrolled</p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleAddOrUpdate}
              className="font-medium text-sm px-4 py-2 rounded-lg flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition duration-200"
            >
              <LuCirclePlus size={20} />
              {editIndex !== null ? "Update Education" : "Add Education"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step4;
