// import React, { useState } from "react";
// import { toPng } from "html-to-image";
// import jsPDF from "jspdf";
// import Swal from "sweetalert2";
// import { useAuth } from "@/hooks/useAuth";
// import useAxiosSecure from "@/hooks/useAxiosSecure";

// const DownloadButton = ({ resumeRef }) => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [loading, setLoading] = useState(false);

//   const handleDownloadPDF = async () => {
//     if (!resumeRef.current) return;
//     try {
//       setLoading(true);
//       // Convert resume to PNG
//       const dataUrl = await toPng(resumeRef.current, { cacheBust: true, quality: 1, pixelRatio: 2 });
//       // Create A4 PDF
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgProps = pdf.getImageProperties(dataUrl);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("resume.pdf");
//     } catch (err) {
//       console.error("PDF download error:", err);
//       Swal.fire("Error", "Something went wrong while downloading PDF.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       if (user?.subscription && user?.subscription?.pay_per_download_credits > 0) {
//         await handleDownloadPDF();
//         return;
//       }
//       Swal.fire({
//         title: "No Plan or Credits",
//         text: "You don't have an active plan or credits. Please upgrade to continue.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#000",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Upgrade Plan",
//         cancelButtonText: "Close",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           window.location.href = "/price";
//         }
//       });
//     } catch (error) {
//       console.error("Download error:", error);
//       Swal.fire("Error", "Something went wrong. Please try again.", "error");
//     }
//   };

//   const showUpgradeButton =
//     (!user?.subscription || user?.subscription?.status !== "active") &&
//     (!user?.pay_per_download_credits || user?.pay_per_download_credits <= 0);

//   return (
//     <div className="text-center mb-4">
//       {showUpgradeButton ? (
//         <button
//           type="button"
//           onClick={() => (window.location.href = "/price")}
//           className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition-all"
//         >
//           Upgrade Plan
//         </button>
//       ) : (
//         <button
//           type="button"
//           onClick={handleDownload}
//           className={`bg-black text-white border-[1px] border-white px-5 py-2 rounded hover:bg-gray-800 transition-all ${
//             loading ? "cursor-not-allowed opacity-70" : ""
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Downloading..." : "Download as PDF"}
//         </button>
//       )}
//     </div>
//   );
// };

// export default DownloadButton;


import React, { useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const DownloadButton = ({ resumeRef }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // Ensure all images are loaded before exporting
  const waitForImages = async (element) => {
    const images = Array.from(element.querySelectorAll("img"));
    const promises = images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve(true);
          else img.onload = img.onerror = resolve;
        })
    );
    await Promise.all(promises);
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      setLoading(true);

      // Wait for images to load
      await waitForImages(resumeRef.current);

      // Convert resume to PNG
      const dataUrl = await toPng(resumeRef.current, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 2,
      });

      // Create A4 PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (err) {
      console.error("PDF download error:", err);
      Swal.fire(
        "Error",
        "Something went wrong while downloading PDF. Make sure all images are loaded.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      if (user?.subscription && user?.subscription?.pay_per_download_credits > 0) {
        await handleDownloadPDF();
        return;
      }
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
          window.location.href = "/price";
        }
      });
    } catch (error) {
      console.error("Download error:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

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
          className={`bg-black text-white border-[1px] border-white px-5 py-2 rounded hover:bg-gray-800 transition-all ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Downloading..." : "Download as PDF"}
        </button>
      )}
    </div>
  );
};

export default DownloadButton;
