

// import React, { useState } from "react";
// import * as htmlToImage from "html-to-image";
// import jsPDF from "jspdf";
// import Swal from "sweetalert2";
// import { useAuth } from "@/hooks/useAuth";
// import { useLocation } from "react-router-dom";

// const DownloadButton = ({ resumeRef }) => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();

//   const resumeName =
//     location.pathname === "/dashboard/create-cover-letter"
//       ? "cover_letter"
//       : "resume";

//   // Wait until all images are loaded
//   const waitForImages = async (element) => {
//     const images = Array.from(element.querySelectorAll("img"));
//     await Promise.all(
//       images.map(
//         (img) =>
//           new Promise((resolve) => {
//             img.crossOrigin = "anonymous";
//             if (img.complete) resolve(true);
//             else img.onload = img.onerror = () => resolve(true);
//           })
//       )
//     );
//   };

//   const handleDownloadPDF = async () => {
//     if (!resumeRef.current) return;

//     try {
//       setLoading(true);
//       await waitForImages(resumeRef.current);

//       let dataUrl;

//       try {
//         // Use JPEG instead of PNG to reduce file size
//         dataUrl = await htmlToImage.toJpeg(resumeRef.current, {
//           quality: 0.85, // Compress image
//           cacheBust: true,
//           pixelRatio: 1.5, // moderate resolution
//         });
//       } catch (err) {
//         console.warn("toJpeg failed, using toCanvas fallback:", err);
//         const canvas = await htmlToImage.toCanvas(resumeRef.current, {
//           cacheBust: true,
//           pixelRatio: 1.5,
//         });
//         dataUrl = canvas.toDataURL("image/jpeg", 0.85);
//       }

//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       const imgProps = pdf.getImageProperties(dataUrl);
//       const imgWidth = pdfWidth;
//       const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       // Scale down if image height exceeds page height
//       const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

//       pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, finalHeight);
//       pdf.save(`${resumeName}.pdf`);
//     } catch (err) {
//       console.error("PDF download error:", err);
//       Swal.fire(
//         "Error",
//         "Something went wrong while downloading PDF. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const canDownload = () => {
//     const sub = user?.subscription;
//     if (!sub) return false;

//     const now = new Date();
//     const startDate = sub.start_date ? new Date(sub.start_date) : null;
//     const endDate = sub.end_date ? new Date(sub.end_date) : null;

//     const inDateRange =
//       startDate && endDate ? now >= startDate && now <= endDate : false;

//     return inDateRange || sub.pay_per_download_credits > 0;
//   };

//   const handleDownload = async () => {
//     // Subscription check (optional)
//     // if (!canDownload()) {
//     //   Swal.fire({
//     //     title: "No Active Subscription or Credits",
//     //     text: "You can't download because your subscription is expired and you have no remaining credits.",
//     //     icon: "info",
//     //     showCancelButton: true,
//     //     confirmButtonColor: "#000",
//     //     cancelButtonColor: "#d33",
//     //     confirmButtonText: "Upgrade Plan",
//     //     cancelButtonText: "Close",
//     //   }).then((result) => {
//     //     if (result.isConfirmed) window.location.href = "/price";
//     //   });
//     //   return;
//     // }
//     await handleDownloadPDF();
//   };

//   return (
//     <div className="text-center mb-4">
//       <button
//         type="button"
//         onClick={handleDownload}
//         className={`bg-black text-white border-[1px] border-white px-5 py-2 rounded hover:bg-gray-800 transition-all ${
//           loading ? "cursor-not-allowed opacity-70" : ""
//         }`}
//         disabled={loading}
//       >
//         {loading ? "Downloading..." : "Download as PDF"}
//       </button>
//     </div>
//   );
// };

// export default DownloadButton;


import React, { useState } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";

const DownloadButton = ({ resumeRef }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const resumeName =
    location.pathname === "/dashboard/create-cover-letter"
      ? "cover_letter"
      : "resume";

  // Wait until all images are loaded
  const waitForImages = async (element) => {
    const images = Array.from(element.querySelectorAll("img"));
    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            img.crossOrigin = "anonymous";
            if (img.complete) resolve(true);
            else img.onload = img.onerror = () => resolve(true);
          })
      )
    );
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      setLoading(true);
      await waitForImages(resumeRef.current);

      let dataUrl;

      try {
        // Use JPEG instead of PNG to reduce file size
        dataUrl = await htmlToImage.toJpeg(resumeRef.current, {
          quality: 1, // Compress image
          cacheBust: true,
          pixelRatio: 1.8, // moderate resolution
        });
      } catch (err) {
        console.warn("toJpeg failed, using toCanvas fallback:", err);
        const canvas = await htmlToImage.toCanvas(resumeRef.current, {
          cacheBust: true,
          pixelRatio: 1.8,
        });
        dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      }

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(dataUrl);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Scale down if image height exceeds page height
      const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, finalHeight);
      pdf.save(`${resumeName}.pdf`);
    } catch (err) {
      console.error("PDF download error:", err);
      Swal.fire(
        "Error",
        "Something went wrong while downloading PDF. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const canDownload = () => {
    const sub = user?.subscription;
    if (!sub) return false;

    const now = new Date();
    const startDate = sub.start_date ? new Date(sub.start_date) : null;
    const endDate = sub.end_date ? new Date(sub.end_date) : null;

    const inDateRange =
      startDate && endDate ? now >= startDate && now <= endDate : false;

    return inDateRange || sub.pay_per_download_credits > 0;
  };

  const handleDownload = async () => {
    // Subscription check (optional)
    if (!canDownload()) {
      Swal.fire({
        title: "No Active Subscription or Credits",
        text: "You can't download because your subscription is expired and you have no remaining credits.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Upgrade Plan",
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) window.location.href = "/price";
      });
      return;
    }
    await handleDownloadPDF();
  };

  return (
    <div className="text-center mb-4">
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
    </div>
  );
};

export default DownloadButton;
