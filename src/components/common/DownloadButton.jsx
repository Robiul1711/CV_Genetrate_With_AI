import React from "react";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const DownloadButton = ({ resumeRef }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  console.log(user?.subscription?.pay_per_download_credits)

  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;

    const opt = {
      margin: 0,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(resumeRef.current).save();
  };

  const handleDownload = async () => {
    try {
      // 1. Active subscription
      if (user?.subscription && user?.subscription?.pay_per_download_credits >0) {
        handleDownloadPDF();
        return;
      }


      // 3. No subscription or credits
      Swal.fire({
        title: "No Plan or Credits",
        text: "You don't have an active plan or credits. Please upgrade to continue.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Upgrade Plan",
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/price"; // plain React redirect
        }
      });
    } catch (error) {
      console.error("Download error:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  // Conditionally render upgrade button if no active plan and no credits
  const showUpgradeButton =
    (!user?.subscription || user?.subscription?.status !== "active") &&
    (!user?.pay_per_download_credits || user?.pay_per_download_credits <= 0);

  return (
    <div className="text-center mb-4">
      {showUpgradeButton ? (
        <button
          type="button"
          onClick={() => (window.location.href = "/price")}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition-all"
        >
          Upgrade Plan
        </button>
      ) : (
        <button
          type="button"
          onClick={handleDownload}
          className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition-all"
        >
          Download as PDF
        </button>
      )}
    </div>
  );
};

export default DownloadButton;
