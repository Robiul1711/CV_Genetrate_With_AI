// import React, { useState } from "react";
// import * as htmlToImage from "html-to-image";
// import jsPDF from "jspdf";
// import Swal from "sweetalert2";
// import { useAuth } from "@/hooks/useAuth";
// import { useLocation } from "react-router-dom";
// import { useEmail } from "@/hooks/useEmail";

// const DownloadButton = ({ resumeRef }) => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const { language } = useEmail(); // expects "en" or "de"

//   // --- Translation strings -------------------------------
//   const messages = {
//     en: {
//       downloadButton: "Download as PDF",
//       downloading: "Downloading...",
//       errorTitle: "Error",
//       errorImage: "Please upload an image to your CV.",
//       noSubTitle: "No Active Subscription or Credits",
//       noSubText:
//         "You can't download because your subscription has expired and you have no remaining credits.",
//       upgradePlan: "Upgrade Plan",
//       close: "Close",
//     },
//     de: {
//       downloadButton: "Als PDF herunterladen",
//       downloading: "Wird heruntergeladen...",
//       errorTitle: "Fehler",
//       errorImage: "Bitte laden Sie ein Bild für Ihren Lebenslauf hoch.",
//       noSubTitle: "Kein aktives Abonnement oder Guthaben",
//       noSubText:
//         "Sie können nicht herunterladen, da Ihr Abonnement abgelaufen ist und Sie keine verbleibenden Guthaben haben.",
//       upgradePlan: "Tarif upgraden",
//       close: "Schließen",
//     },
//   };

//   const t = messages[language] || messages.en; // fallback to English

//   const resumeName =
//     location.pathname === "/dashboard/create-cover-letter"
//       ? "cover_letter"
//       : "resume";

//   // Wait until all images are loaded or errored
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

//   const waitForFonts = async () => {
//     if (document.fonts) {
//       await document.fonts.ready;
//     }
//   };

//   const handleDownloadPDF = async () => {
//     if (!resumeRef.current) return;
//     try {
//       setLoading(true);

//       await waitForImages(resumeRef.current);
//       await waitForFonts();

//       const dataUrl = await htmlToImage.toJpeg(resumeRef.current, {
//         quality: 1,
//         cacheBust: true,
//         pixelRatio: 1.8,
//         useCORS: true,
//         skipFonts: true,
//       });

//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       const imgProps = pdf.getImageProperties(dataUrl);
//       const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

//       pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, finalHeight);
//       pdf.save(`${resumeName}.pdf`);
//     } catch (err) {
//       console.error(err);
//       Swal.fire(t.errorTitle, t.errorImage, "error");
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
//     // Subscription check example (keep commented if not needed):
//     /*
//     if (!canDownload()) {
//       Swal.fire({
//         title: t.noSubTitle,
//         text: t.noSubText,
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#000",
//         cancelButtonColor: "#d33",
//         confirmButtonText: t.upgradePlan,
//         cancelButtonText: t.close,
//       }).then((result) => {
//         if (result.isConfirmed) window.location.href = "/price";
//       });
//       return;
//     }
//     */
//     await handleDownloadPDF();
//   };

//   return (
//     <div className="text-center mb-4">
//       <button
//         type="button"
//         onClick={handleDownload}
//         className={`bg-black text-white border border-white px-5 py-2 rounded hover:bg-gray-800 transition-all ${
//           loading ? "cursor-not-allowed opacity-70" : ""
//         }`}
//         disabled={loading}
//       >
//         {loading ? t.downloading : t.downloadButton}
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
import { useEmail } from "@/hooks/useEmail";

const DownloadButton = ({ resumeRef }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const {language} = useEmail(); // expected to return "en" or "de"

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

  const waitForFonts = async () => {
    if (document.fonts) {
      await document.fonts.ready;
    }
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    try {
      setLoading(true);
      await waitForFonts();
      await waitForImages(resumeRef.current);

      const dataUrl = await htmlToImage.toJpeg(resumeRef.current, {
        quality: 1,
   
        pixelRatio: 1.8,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(dataUrl);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, finalHeight);
      pdf.save(`${resumeName}.pdf`);
    } catch (err) {
      console.error(err);
      Swal.fire(
        language === "de" ? "Fehler" : "Error",
        language === "de"
          ? "Beim Erstellen der PDF ist ein Problem aufgetreten. Bitte stellen Sie sicher, dass alle erforderlichen Bilder hochgeladen sind und versuchen Sie es erneut."
          : "An error occurred while generating the PDF. Please make sure all required images are uploaded and try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
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
        {loading
          ? language === "de"
            ? "Wird heruntergeladen..."
            : "Downloading..."
          : language === "de"
          ? "Als PDF herunterladen"
          : "Download as PDF"}
      </button>
    </div>
  );
};

export default DownloadButton;
