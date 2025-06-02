import React, { useState } from "react";
import { Flower } from "../CustomIcons/CustomIcon";
import { Check, MoveUpRight } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import uk from "../../assets/images/uk.png";

const faqData = [
  {
    question: "What’s the difference between the free and paid plans",
    answer:
      "The free plan lets you create watermarked resumes. Paid plans (€4.99+/month) offer unlimited downloads, premium templates, and add-ons like Interview Coach (coming soon).",
  },
  {
    question: "How does the ‘Industry–Tailored CV’ feature work?",
    answer:
      "It helps you generate CVs tailored to specific industries using AI.",
  },
  {
    question: "Is lifetime access truly unlimited?",
    answer: "Yes, with our Pro plan you get lifetime access to all features.",
  },
  {
    question: "Can I edit my CV after downloading?",
    answer: "Yes, you can edit your CV any time from your dashboard.",
  },
  {
    question: "Are my payment details secure for add–ons?",
    answer: "Absolutely, we use industry-standard encryption for all payments.",
  },
];

const ContactForm = () => {
  const [checked, setChecked] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="my-8">
      <div className="relative">
        <div className="hidden md:block absolute top-0 bottom-0 left-[48%] w-px bg-[#262626] transform -translate-x-1/4 z-0" />
        <div className="grid md:grid-cols-2 gap-12 pb-20 section-padding-x">
          {/* Left Side Title */}
          <div className="flex items-center">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Get in Touch Clever <br />{" "}
              <span className="pt-4 inline-block">CV </span>
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">Phone Number</label>
                <div className="flex items-center gap-5 w-full">
                  <div className="w-[25%] flex items-center bg-[#0E0E10] border border-[#262626] rounded-md p-3 gap-3">
                    <img src={uk} alt="UK Flag" />
                    <IoIosArrowDown />
                  </div>
                  <div className="flex-1 flex items-center bg-[#0E0E10] border border-[#262626] rounded-md p-3">
                    <input
                      type="tel"
                      placeholder="Enter Phone Number"
                      className="bg-transparent outline-none w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Enter your Message"
                className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
              ></textarea>
            </div>
            <div className="flex justify-between items-center my-4">
              <div className="my-6 text-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <span
                    className={`w-5 h-5 flex justify-center items-center border rounded-sm 
          ${
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
                    I agreeing to the terms of service and privacy policy
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-md font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr className="border-1 border-[#262626]" />
      <div className="relative">
        <div className="hidden md:block absolute top-0 bottom-0 left-[48%] w-px bg-[#262626] transform -translate-x-1/4 z-0" />
        <div className="grid md:grid-cols-2 gap-12 pt-16 section-padding-x items-start">
          <div className="flex flex-col items-start justify-center">
            <div className="flex flex-col items-start gap-3 mb-4">
              <Flower className="w-18 h-18" />

              <h2 className="text-2xl font-semibold">Asked question</h2>
            </div>
            <p className="text-gray-400 mb-6 w-full md:w-[60%]">
              If the question is not available on our FAQ section, feel free to
              contact us personally, we will resolve your respective doubts.
            </p>
            <button className="bg-black border flex items-center gap-2 border-[#81FB84]/20 text-[#FFF] px-5 py-2 rounded-lg transition">
              Ask Question <MoveUpRight size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div key={idx} className="bg-[#0E0E10] p-5 rounded-md">
                <h3
                  className="text-lg font-medium flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(idx)}
                >
                  {faq.question}
                  <span className="text-2xl">
                    {openIndex === idx ? "−" : "+"}
                  </span>
                </h3>
                {openIndex === idx && (
                  <p className="mt-2 text-gray-400 text-sm border-t py-4 border-[#262626]">
                    {faq.answer}
                  </p>
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
