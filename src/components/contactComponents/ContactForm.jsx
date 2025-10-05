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

  const texts = {
    en: {
      title: "Get in Touch Clever CV",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      message: "Message",
      placeholderFirstName: "Enter First Name",
      placeholderLastName: "Enter Last Name",
      placeholderEmail: "Enter your Email",
      placeholderPhone: "Enter Phone Number",
      placeholderMessage: "Enter your Message",
      checkbox: "I agree to the terms of service ",
      sendButton: "Send Message",
      sendingButton: "Sending...",
      faqTitle: "Asked Questions",
      faqDescription:
        "If the question is not available on our FAQ section, feel free to contact us personally, we will resolve your respective doubts.",
      askQuestion: "Ask Question",
      fillRequired: "Please fill in all required fields.",
      agreeTerms: "You must agree to the terms of service.",
    },
    de: {
      title: "Kontaktieren Sie Clever CV",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      phone: "Telefonnummer",
      message: "Nachricht",
      placeholderFirstName: "Geben Sie den Vornamen ein",
      placeholderLastName: "Geben Sie den Nachnamen ein",
      placeholderEmail: "Geben Sie Ihre E-Mail ein",
      placeholderPhone: "Geben Sie die Telefonnummer ein",
      placeholderMessage: "Geben Sie Ihre Nachricht ein",
      checkbox: "Ich stimme den Nutzungsbedingungen ",
      sendButton: "Nachricht senden",
      sendingButton: "Wird gesendet...",
      faqTitle: "Häufig gestellte Fragen",
      faqDescription:
        "Wenn die Frage nicht in unserem FAQ-Bereich verfügbar ist, kontaktieren Sie uns gerne persönlich, wir werden Ihre jeweiligen Zweifel klären.",
      askQuestion: "Frage stellen",
      fillRequired: "Bitte füllen Sie alle erforderlichen Felder aus.",
      agreeTerms: "Sie müssen den Nutzungsbedingungen zustimmen.",
    },
  };

  const t = texts[language] || texts.en;

  const ContactMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/contact-us/", data);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.message) {
      toast.error(t.fillRequired);
      return;
    }
    if (!checked) {
      toast.error(t.agreeTerms);
      return;
    }

    ContactMutation.mutate({ ...formData, agree_terms: checked });
  };

  const { data } = useQuery({
    queryKey: ["faqs", language],
    queryFn: () =>
      axiosPublic.get("/faqs", { params: { lan: language } }),
  });

  const FaqData = data?.data?.data;

  return (
    <div className="md:my-8">
      <div className="relative">
        <div className="hidden lg:block absolute top-0 bottom-0 left-[48%] w-px bg-[#262626] transform -translate-x-1/4 z-0" />
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 pb-12 md:pb-20 section-padding-x">
          <div className="flex items-center">
            <h2 className="text-3xl md:text-3xl text-center font-semibold">{t.title}</h2>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">{t.firstName}</label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  type="text"
                  placeholder={t.placeholderFirstName}
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">{t.lastName}</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  type="text"
                  placeholder={t.placeholderLastName}
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">{t.email}</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder={t.placeholderEmail}
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">{t.phone}</label>
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  type="tel"
                  placeholder={t.placeholderPhone}
                  className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">{t.message}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder={t.placeholderMessage}
                className="w-full bg-[#0E0E10] border border-[#262626] p-3 rounded-md"
              />
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

                  <Link to={`/tearms-and-condition`} target="_blank" className="text-sm text-[#81FB84]">{t.checkbox}</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={ContactMutation.isPending}
                className={`px-4 ${
                  ContactMutation.isPending ? "bg-gray-400" : "bg-[#FFF]"
                } text-black py-2 my-3 text-sm font-medium rounded-xl flex justify-center items-center gap-2`}
              >
                {ContactMutation.isPending ? t.sendingButton : t.sendButton}
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
              <h2 className="text-2xl font-semibold">{t.faqTitle}</h2>
            </div>
            <p className="text-gray-400 mb-6 w-full md:w-[60%]">{t.faqDescription}</p>
            <Link
              to="/ai-help"
              className="bg-black border flex items-center gap-2 border-[#81FB84]/20 text-[#FFF] px-5 py-2 hover:bg-white hover:text-dark transition-all duration-300 rounded-lg"
            >
              {t.askQuestion} <MoveUpRight size={18} />
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
                  <span className="text-2xl">{openIndex === idx ? "−" : "+"}</span>
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
