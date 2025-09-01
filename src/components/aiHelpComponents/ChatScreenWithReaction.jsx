import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function CoverLetter({ resumeRef }) {
  const [data, setData] = useState(null);
  const [parsedContent, setParsedContent] = useState(null);

  // Sample data (replace with your actual data source)
  const sampleData = {
    "name": "John Doe",
    "contact_information": {
      "address": "123 Elm Street, Berlin, Germany",
      "phone": "+49 30 12345678",
      "email": "john.doe@example.com"
    },
    "professional_summary": "Experienced researcher with a strong background in environmental science, specializing in sustainable development and ecological analysis. Proven ability to conduct comprehensive studies and disseminate findings through academic publications and conferences.",
    "skills": ["Advanced Data Analysis", "Academic Writing", "Project Management", "Publications and Presentations"],
    "education": [
      {
        "degree": "Ph.D. in Environmental Science",
        "institution": "University of Berlin",
        "year": "2020"
      },
      {
        "degree": "Master of Science in Sustainability Studies",
        "institution": "Technical University of Munich",
        "year": "2015"
      },
      {
        "degree": "Bachelor of Science in Biology",
        "institution": "Johann Wolfgang Goethe University",
        "year": "2012"
      }
    ],
    "professional_experience": [
      {
        "position": "Research Fellow",
        "company": "Max Planck Institute for Biological Intelligence",
        "period": "2020 – Present",
        "responsibilities": [
          "Leading interdisciplinary research projects focused on ecological conservation",
          "Publishing findings in high-impact journals",
          "Presenting at international conferences"
        ]
      },
      {
        "position": "Research Assistant",
        "company": "University of Berlin",
        "period": "2016 – 2020",
        "responsibilities": [
          "Supporting faculty research on environmental impact assessments",
          "Conducting field studies and data analysis",
          "Co-authoring academic papers"
        ]
      }
    ],
    "additional_qualifications": ["Fluent in English and German", "Proficient in statistical software", "Member of the German Society for Environmental Studies"],
    "desired_job_title": "Research Scientist in Ecology and Sustainable Development",
    "cover_letter_content": "Dear Hiring Committee,\n\nI am writing to express my strong interest in the position of Research Scientist in Ecology and Sustainable Development as advertised. With a Ph.D. in Environmental Science from the University of Berlin and extensive experience conducting interdisciplinary research at leading institutions, I am confident in my ability to contribute effectively to your team's academic pursuits.\n\nThroughout my career, I have demonstrated a commitment to advancing understanding of ecological systems and sustainable practices. My role as a Research Fellow at the Max Planck Institute has enabled me to lead innovative projects, publish in reputable journals, and present at international conferences, all of which have sharpened my academic and professional skills. Moreover, my experience supporting environmental impact assessments and conducting comprehensive field studies has provided me with a solid foundation in research methodologies.\n\nBeing fluent in both English and German, I am adept at communicating complex scientific ideas to diverse audiences and collaborating within multilingual teams. My proficiency in statistical software further enhances my analytical capabilities, ensuring the accuracy and relevance of my research findings.\n\nI am eager to bring my academic background, research expertise, and passion for ecological sustainability to your esteemed organization. I look forward to the possibility of contributing to innovative projects aligned with your institution's commitment to environmental excellence.\n\nThank you for considering my application. I am available at your convenience for an interview and am excited about the opportunity to discuss how my background and skills can serve your team.\n\nSincerely,\n\nJohn Doe"
  };

  useEffect(() => {
    // In a real application, you would get this data from props or context
    setData(sampleData);
    
    // Parse the resume_content if it exists and is a string
    try {
      if (sampleData.cover_letter_content) {
        setParsedContent(sampleData.cover_letter_content);
      }
    } catch (error) {
      console.error("Error parsing resume content:", error);
    }
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      ref={resumeRef} 
      className="w-[210mm] bg-white shadow-lg py-12 px-20 mx-auto outfit"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#2E2E48]">
          {data.name}
        </h1>
        <p className="text-[#516CF7] font-medium text-lg">{data.desired_job_title}</p>

        {/* Contact Information */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <MdEmail className="text-[#79819A] text-xl p-1.5 bg-[#79819A]/20 rounded-full" />
            <div>
              <p className="text-xs text-[#79819A]">Email</p>
              <p className="text-sm text-[#47516B]">{data.contact_information.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdPhone className="text-[#79819A] text-xl p-1.5 bg-[#79819A]/20 rounded-full" />
            <div>
              <p className="text-xs text-[#79819A]">Phone</p>
              <p className="text-sm text-[#47516B]">{data.contact_information.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdLocationOn className="text-[#79819A] text-xl p-1.5 bg-[#79819A]/20 rounded-full" />
            <div>
              <p className="text-xs text-[#79819A]">Address</p>
              <p className="text-sm text-[#47516B]">{data.contact_information.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-200 my-6" />

      {/* Cover Letter Body */}
      <div className="text-sm text-gray-800 leading-relaxed">
        <p className="text-[#2E2E48] font-medium">
          {new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        <p className="mt-4 text-[#2E2E48] font-medium">
          Dear Hiring Manager,
        </p>

        <div className="mt-4 tracking-[0.5px] leading-[24px] text-[#47516B]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {parsedContent || data.cover_letter_content}
          </ReactMarkdown>
        </div>

        <div className="mt-8 text-[#2E2E48] font-medium">
          <p>Sincerely,</p>
          <p className="mt-1">
            {data.name}
          </p>
        </div>
      </div>
    </div>
  );
}