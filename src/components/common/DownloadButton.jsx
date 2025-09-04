// import React, { useState } from "react";
// import { toPng } from "html-to-image";
// import jsPDF from "jspdf";
// import Swal from "sweetalert2";
// import { useAuth } from "@/hooks/useAuth";

// const DownloadButton = ({ resumeRef }) => {
//   console.log(resumeRef);
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);

//   // Wait for images to load
//   const waitForImages = async (element) => {
//     const images = Array.from(element.querySelectorAll("img"));
//     await Promise.all(
//       images.map(
//         (img) =>
//           new Promise((resolve) => {
//             if (img.complete) resolve(true);
//             else (img.onload = img.onerror = resolve);
//           })
//       )
//     );
//   };

//   const handleDownloadPDF = async () => {
//     if (!resumeRef.current) return;

//     try {
//       setLoading(true);
//       await waitForImages(resumeRef.current);

//       const dataUrl = await toPng(resumeRef.current, {
//         cacheBust: true,
//         quality: 1,
//         pixelRatio: 2,
//       });

//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgProps = pdf.getImageProperties(dataUrl);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("resume.pdf");
//     } catch (err) {
//       console.error("PDF download error:", err);
//       Swal.fire(
//         "Error",
//         "Something went wrong while downloading PDF. Make sure all images are loaded.",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check if user can download
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

const DownloadButton = ({ resumeRef }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Wait until all images are loaded (with CORS fix)
  const waitForImages = async (element) => {
    const images = Array.from(element.querySelectorAll("img"));
    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            img.crossOrigin = "anonymous"; // Prevent CORS issues
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

      // Try PNG first, fallback to Canvas if it fails
      try {
        dataUrl = await htmlToImage.toPng(resumeRef.current, {
          cacheBust: true,
          pixelRatio: 2,
        });
      } catch (err) {
        console.warn("toPng failed, using toCanvas fallback:", err);
        const canvas = await htmlToImage.toCanvas(resumeRef.current, {
          cacheBust: true,
          pixelRatio: 2,
        });
        dataUrl = canvas.toDataURL("image/png");
      }

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add first page
      let position = 0;
      let heightLeft = pdfHeight;

      pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      // Add extra pages if content is longer
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save("resume.pdf");
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

  // Check if user can download (optional subscription check)
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
    // Uncomment if you want to block non-subscribers
    /*
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
    */

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