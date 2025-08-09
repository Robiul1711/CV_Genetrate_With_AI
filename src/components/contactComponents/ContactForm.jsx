import React, { useState } from "react";
import { Flower } from "../CustomIcons/CustomIcon";
import { Check, MoveUpRight } from "lucide-react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ContactForm = () => {
  const [checked, setChecked] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail();

  const ContactMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/contact-us/", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        message: "",
      });
      setChecked(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!checked) {
      toast.error("You must agree to the terms of service.");
      return;
    }

    ContactMutation.mutate({
      ...formData,
      agree_terms: checked,
    });
  };

  const { data } = useQuery({
    queryKey: ["faqs", language],
    queryFn: () =>
      axiosPublic.get("/faqs", {
        params: { lan: language },
      }),
  });

  const FaqData = data?.data?.data;

  return (
    <div className="md:my-8">
      <div className="relative">
        <div className="hidden lg:block absolute top-0 bottom-0 left-[48%] w-px bg-[#262626] transform -translate-x-1/4 z-0" />
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 pb-12 md:pb-20 section-padding-x">
          {/* Left Side Title */}
          <div className="flex items-center">
            <h2 className="text-3xl md:text-3xl text-center font-semibold">
              Get in Touch Clever CV
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter First Name"
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Last Name"
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">Phone Number</label>
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Enter Phone Number"
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Enter your Message"
                className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
              ></textarea>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-4">
              <div className="my-6 text-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <span
                    className={`w-5 h-5 flex justify-center items-center border rounded-sm ${
                      checked ? "border-[#81FB84] bg-black" : "border-[#666666] bg-black"
                    }`}
                  >
                    {checked && <Check size={14} className="text-[#81FB84]" />}
                  </span>

                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className="hidden"
                  />

                  <span className="text-sm">
                    I agree to the terms of service and privacy policy
                  </span>
                </label>
              </div>
              <button
                type="submit"
                disabled={ContactMutation.isPending}
                className={`px-4 ${
                  ContactMutation.isPending ? "bg-gray-400" : "bg-[#FFF]"
                } text-black py-2 my-3 text-sm font-medium rounded-xl flex justify-center items-center gap-2`}
              >
                {ContactMutation.isPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <hr className="border-1 border-[#262626]" />
      <div className="relative">
        <div className="hidden lg:block absolute top-0 bottom-0 left-[48%] w-px bg-[#262626] transform -translate-x-1/4 z-0" />
        <div className="grid lg:grid-cols-2 gap-12 pt-16 section-padding-x items-start">
          <div className="flex flex-col items-start justify-center">
            <div className="flex flex-col items-start gap-3 mb-4">
              <Flower className="w-18 h-18" />
              <h2 className="text-2xl font-semibold">Asked question</h2>
            </div>
            <p className="text-gray-400 mb-6 w-full md:w-[60%]">
              If the question is not available on our FAQ section, feel free to
              contact us personally, we will resolve your respective doubts.
            </p>
            <Link to="/ai-help" className="bg-black border flex items-center gap-2 border-[#81FB84]/20 text-[#FFF] px-5 py-2 hover:bg-white hover:text-dark transition-all duration-300 rounded-lg">
              Ask Question <MoveUpRight size={18} />
            </Link>
          </div>

          <div className="space-y-4">
            {FaqData?.map((faq, idx) => (
              <div key={idx} className="bg-[#0E0E10] p-5 rounded-md">
                <h3
                  className="md:text-lg font-medium flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(idx)}
                >
                  {faq.question}
                  <span className="text-2xl">
                    {openIndex === idx ? "−" : "+"}
                  </span>
                </h3>
                {openIndex === idx && (
                  <p
                    className="mt-2 text-[#7E7E81] text-sm border-t py-4 border-[#262626]"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  ></p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
