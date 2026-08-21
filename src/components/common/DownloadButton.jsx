import React, { useState } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const DownloadButton = ({ resumeRef }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const resumeName =
    location.pathname.includes("cover-letter") ? "cover_letter" : "resume";

  const handleDownloadPDF = async () => {
    if (!resumeRef?.current) {
      toast.error("No document found to export.");
      return;
    }

    try {
      setLoading(true);

      const dataUrl = await htmlToImage.toJpeg(resumeRef.current, {
        quality: 1,
        pixelRatio: 1.8,
        cacheBust: true,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, finalHeight);
      pdf.save(`${resumeName}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mb-4">
      <button
        type="button"
        onClick={handleDownloadPDF}
        className={`bg-white text-black font-semibold border border-white px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-all ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Downloading..." : "Download as PDF"}
      </button>
    </div>
  );
};

export default DownloadButton;
