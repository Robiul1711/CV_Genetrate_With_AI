import React from "react";

const PlanTable = () => {
  return (
    <div className="mb-12">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[36px] md:text-[48px] font-bold">
          Find your perfect plan
        </h1>
        <p className="text-xl text-[#9B9B9B] py-4 ">
          Compare features and choose what works for you
        </p>
      </div>
      <div className="overflow-x-auto my-8 border border-[#262626] rounded-xl text-white  bg-black">
        <table className="min-w-full text-sm text-left ">
          <thead className="bg-[#0E0E10] text-white text-base md:text-[30px]">
            <tr>
              <th className="px-6 py-10">Features</th>
              <th className="p-4">Free</th>
              <th className="p-4">Basic</th>
              <th className="p-4">Pro</th>
              <th className="p-4">Pay-Pay-Download</th>
            </tr>
          </thead>
          <tbody className="text-sm space-y-2">
            <tr>
              <td className="p-6 px-6 text-lg md:text-[26px] border-b border-[#262626] rounded-xl">
                Resume Creation
              </td>
              <td className="p-4 px-6 border-b border-[#262626]">✓ Basic</td>
              <td className="p-4  border-b border-[#262626]">✓ unlimited</td>
              <td className="p-4 border-b border-[#262626]">✓ unlimited</td>
              <td className="p-4 border-b border-[#262626]">✓ One time</td>
            </tr>
            <tr>
              <td className="p-6 px-6 text-lg md:text-[26px]  border-b border-[#262626]">
                AI Design Assistant
              </td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
            </tr>
            <tr>
              <td className="p-6 px-6 text-lg md:text-[26px]  border-b border-[#262626]">
                CV Editor
              </td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
            </tr>
            <tr>
              <td className="p-6 px-6 text-lg md:text-[26px] border-b border-[#262626]">
                Download
              </td>
              <td className="p-4 border-b border-[#262626]">✓ low Quality</td>
              <td className="p-4 border-b border-[#262626]">5/month</td>
              <td className="p-4 border-b border-[#262626]">Unlimited</td>
              <td className="p-4 border-b border-[#262626]">€4.99 each</td>
            </tr>
            <tr>
              <td className="p-6 px-6 text-lg md:text-[26px] border-b border-[#262626]">
                Templates
              </td>
              <td className="p-4 border-b border-[#262626]">1 Basic</td>
              <td className="p-4 border-b border-[#262626]">5 Basic</td>
              <td className="p-4 border-b border-[#262626]">Premium</td>
              <td className="p-4 border-b border-[#262626]">Basic Only</td>
            </tr>
            <tr>
              <td className="p-6 px-6 text-lg md:text-[26px] border-b border-[#262626]">
                No Watermark
              </td>
              <td className="p-4 border-b border-[#262626]">✕</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
            </tr>
            <tr>
              <td className="p-6 px-6 text-lg md:text-[26px] border-b border-[#262626]">
                Multilingual Support
              </td>
              <td className="p-4 border-b border-[#262626]">✕</td>
              <td className="p-4 border-b border-[#262626]">✕</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">+€4.99 each</td>
            </tr>
            <tr>
              <td className="p-6 px-6 text-lg md:text-[26px] border-b border-[#262626]">
                Cover Letter Tools
              </td>
              <td className="p-4 border-b border-[#262626]">✕</td>
              <td className="p-4 border-b border-[#262626]">✕</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">+€1.99 each</td>
            </tr>
            <tr>
              <td className="p-6 px-6 text-lg md:text-[26px] border-b border-[#262626]">
                Application Package Generator
              </td>
              <td className="p-4 border-b border-[#262626]">✕</td>
              <td className="p-4 border-b border-[#262626]">✕</td>
              <td className="p-4 border-b border-[#262626]">✓</td>
              <td className="p-4 border-b border-[#262626]">✕</td>
            </tr>
            <tr>
              <td className="p-6 px-6 text-lg md:text-[26px] border-b border-[#262626]">
                Export Formats
              </td>
              <td className="p-4 border-b border-[#262626]">✓ PNG</td>
              <td className="p-4 border-b border-[#262626]">✓ PDF/DOCX</td>
              <td className="p-4 border-b border-[#262626]">✓ PDF/DOCX</td>
              <td className="p-4 border-b border-[#262626]">✓ PDF/DOCX</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanTable;
